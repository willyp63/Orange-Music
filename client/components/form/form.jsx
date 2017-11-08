import React from 'react';
import { connect } from 'react-redux';
import { MatInput, MatButton, MatModal, MatPicker } from '../material';
import { setFieldValue, submitForm, hideForm } from '../../store/modules/form';

const Form = ({ isVisible, schema, fields, setFieldValue, submitForm, hideForm }) => {
  const visibleFields = schema.fields.filter(field => field.isVisible !== false);

  const $fields = visibleFields.map(fieldSchema => {
    const type = fieldSchema.type;
    const field = fields[fieldSchema.name];
    const value = field.value;
    const errors = field.errors;
    const placeholder = fieldSchema.label;
    const onValueChange = (newValue) => {
      setFieldValue(fieldSchema.name, newValue);
      if (typeof fieldSchema.onValueChange === 'function') {
        fieldSchema.onValueChange();
      }
    };
    const $errors = errors.map(error => {
      return (<div className='err-msg' key={error}>{error}</div>);
    });

    if (type === 'picker') {
      return (
        <div key={fieldSchema.name}>
          <MatPicker options={fieldSchema.options} onOptionSelect={onValueChange} />
          {$errors}
        </div>
      );
    } else {
      return (
        <div key={fieldSchema.name}>
          <MatInput value={value} onValueChange={onValueChange} placeholder={placeholder} />
          {$errors}
        </div>
      );
    }
  });

  const $submitButton = schema.submitButtonText
    ? (<MatButton className='submit-btn' text={schema.submitButtonText} onClick={submitForm} />)
    : '';

  return (
    <MatModal className="om-form" isOpen={isVisible}>
      <div className="centered">
        {$fields}
        {$submitButton}
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
