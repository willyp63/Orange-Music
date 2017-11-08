// const EXAMPLE_SCHEMA = {
//   submitButtonText: 'Sign Up!',
//   submitAction: () => {type: 'SUBMIT_FORM'},
//   fields: [
//     {
//       name: 'name',
//       label: 'Name',
//     },
//     {
//       name: 'password',
//       label: 'Password',
//     },
//   ],
// };

const SHOW_FORM = 'orange-music/form/SHOW_FORM';
const HIDE_FORM = 'orange-music/form/HIDE_FORM';

const SET_SCHEMA = 'orange-music/form/SET_SCHEMA';

const SET_FIELD_VALUE = 'orange-music/form/SET_FIELD_VALUE';
const SET_FIELD_ERRORS = 'orange-music/form/SET_FIELD_ERRORS';

const CLEAR_FORM = 'orange-music/form/CLEAR_FORM';


const emptyFormSchema = {
  fields: [],
};

const initialState = {
  isVisible: false,
  schema: emptyFormSchema,
  fields: {},
};

export default function reducer(state = initialState, action = {}) {
  let fields;
  switch (action.type) {
    case SHOW_FORM:
      return {
        ...state,
        isVisible: true,
      };
    case HIDE_FORM:
      return {
        ...state,
        isVisible: false,
      };
    case SET_SCHEMA:
      return {
        ...state,
        schema: action.schema,
        fields: getFields(state, action.schema),
      };
    case SET_FIELD_VALUE:
      fields = Object.assign({}, state.fields);
      fields[action.field].value = action.value;
      return {
        ...state,
        fields,
      };
    case SET_FIELD_ERRORS:
      fields = Object.assign({}, state.fields);
      fields[action.field].errors = action.errors;
      return {
        ...state,
        fields,
      };
    case CLEAR_FORM:
      return {
        ...state,
        fields: getFields(state, state.schema),
      };
    default:
      return state;
  }
}

const getFields = (state, schema) => {
  const fields = {};
  schema.fields.forEach(field => {
    const oldField = state.fields[field.name] || {};
    fields[field.name] = {
      value: oldField.value,
      errors: oldField.errors || [],
    };
  });
  return fields;
};

export const showForm = (schema) => ({type: SHOW_FORM});
export const hideForm = (schema) => ({type: HIDE_FORM});

export const setFormSchema = (schema) => ({type: SET_SCHEMA, schema});

export const setFieldValue = (field, value) => ({
  type: SET_FIELD_VALUE,
  field,
  value,
});

export const setFieldErrors = (field, errors) => ({
  type: SET_FIELD_ERRORS,
  field,
  errors,
});

export const submitForm = () => (dispatch, getState) => {
  getState().form.schema.submitAction();
};

export const clearForm = () => ({type: CLEAR_FORM});
