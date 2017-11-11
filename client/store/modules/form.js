const SET_SCHEMA = 'orange-music/form/SET_SCHEMA';

const SET_FIELD_VALUE = 'orange-music/form/SET_FIELD_VALUE';
const SET_FIELD_ERRORS = 'orange-music/form/SET_FIELD_ERRORS';

const CLEAR_FORM = 'orange-music/form/CLEAR_FORM';

const SHOW_FORM = 'orange-music/form/SHOW_FORM';
const HIDE_FORM = 'orange-music/form/HIDE_FORM';


const initialState = {
  schema: null,
  fields: {},
  isValid: false,
  isOpen: false,
};

export default function reducer(state = initialState, action = {}) {
  let fields;
  switch (action.type) {
    case SET_SCHEMA:
      fields = getFields(action.schema)
      return {
        ...state,
        schema: action.schema,
        fields,
        isValid: isValid(fields),
      };
    case SET_FIELD_VALUE:
      fields = Object.assign({}, state.fields);
      fields[action.fieldName].value = action.value;
      return {...state, fields};
    case SET_FIELD_ERRORS:
      fields = Object.assign({}, state.fields);
      fields[action.fieldName].errors = action.errors;
      return {
        ...state,
        fields,
        isValid: isValid(fields),
      };
    case SHOW_FORM:
      return {
        ...state,
        isOpen: true,
      };
    case HIDE_FORM:
      return {
        ...state,
        isOpen: false,
      };
    case CLEAR_FORM:
      return {
        ...state,
        fields: getFields(Object.keys(state)),
        isValid: false,
      };
    default:
      return state;
  }
}

const getFields = schema => {
  return schema.fields
    ? schema.fields.reduce((fields, fieldSchema) => {
        fields[fieldSchema.name] = {
          value: '',
          errors: [],
        };
        return fields;
      }, {})
    : {};
};

const isValid = fields => Object.values(fields).every(f => f.errors.length === 0);


export const setSchema = (schema) => ({type: SET_SCHEMA, schema});

export const setFieldValue = (fieldName, value) => ({
  type: SET_FIELD_VALUE,
  fieldName,
  value,
});

export const setFieldErrors = (fieldName, errors) => ({
  type: SET_FIELD_ERRORS,
  fieldName,
  errors,
});

export const validateField = fieldName => (dispatch, getState) => {
  const { schema, fields } = getState().form;
  const validator = schema.validator;

  if (typeof validator !== 'function') { return; }
  const errors = validator({[fieldName]: fields[fieldName].value});
  dispatch(setFieldErrors(fieldName, errors[fieldName]));
};

export const validateForm = () => (dispatch, getState) => {
  const { fields } = getState().form;
  Object.keys(fields).forEach(fieldName => dispatch(validateField(fieldName)));
};

export const submitForm = () => (dispatch, getState) => {
  dispatch(validateForm());

  const { schema, isValid } = getState().form;

  if (isValid && typeof schema.submitAction === 'function') {
    schema.submitAction();
  }
};

export const clearForm = () => ({type: CLEAR_FORM});

export const showForm = () => ({type: SHOW_FORM});
export const hideForm = () => ({type: HIDE_FORM});

export const showFormWithSchema = schema => dispatch => {
  dispatch(setSchema(schema));
  dispatch(showForm());
};
