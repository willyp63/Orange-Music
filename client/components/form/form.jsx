import React from 'react';
import { connect } from 'react-redux';
import { MatInput, MatButton, MatModal } from '../material';
import { setFieldValue, submitForm, hideForm } from '../../store/modules/form';

const Form = ({ isVisible, schema, fields, setFieldValue, submitForm, hideForm }) => {
  const $fields = schema.fields.map(fieldSchema => {
    const field = fields[fieldSchema.name];
    const value = field.value;
    const errors = field.errors;
    const placeholder = fieldSchema.label;
    const onValueChange = setFieldValue.bind(null, fieldSchema.name);
    const $errors = errors.map(error => {
      return (<div className='err-msg' key={error}>{error}</div>);
    });
    return (
      <div key={fieldSchema.name}>
        <MatInput value={value} onValueChange={onValueChange} placeholder={placeholder} />
        {$errors}
      </div>
    );
  });

  return (
    <MatModal className="om-form" isOpen={isVisible}>
      <div className="centered">
        {$fields}
        <MatButton text={schema.submitButtonText} onClick={submitForm} />
      </div>
      <MatButton className='close-btn' icon='close' onClick={hideForm} />
    </MatModal>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isVisible: state.form.isVisible,
    schema: state.form.schema,
    fields: state.form.fields,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFieldValue: (field, value) => { dispatch(setFieldValue(field, value)); },
    submitForm: () => { dispatch(submitForm()); },
    hideForm: () => { dispatch(hideForm()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
