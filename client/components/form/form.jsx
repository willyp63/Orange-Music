import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { MatInput, MatButton, MatModal, MatPicker } from '../material';
import { setFieldValue, submitForm, hideForm, clearForm } from '../../store/modules/form';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.isOpen = false;
  }
  componentDidUpdate() {
    if (this.props.isVisible) {
      if (!this.isOpen) {
        const $firstInput = $(ReactDOM.findDOMNode(this)).find('input')[0];
        if ($firstInput) { $firstInput.focus(); }
        this.isOpen = true;
      }
    } else {
      this.isOpen = false;
    }
  }
  render() {
    const { isVisible, schema, fields, setFieldValue, submitForm, hideForm, clearForm } = this.props;

    const $title = schema.title
      ? (<div className='title'>{schema.title}</div>)
      : '';

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

      let $errors = errors.length > 0
        ? errors.map(error => (<div className='err-msg' key={error}>{error}</div>))
        : (<div className='err-msg'></div>);

      if (type === 'picker') {
        return (
          <div key={fieldSchema.name} className='picker-field'>
            <MatPicker options={fieldSchema.options} onOptionSelect={onValueChange} formatter={fieldSchema.formatter} />
            {$errors}
          </div>
        );
      } else {
        return (
          <div key={fieldSchema.name}>
            <MatInput className='input-field' value={value} onValueChange={onValueChange} placeholder={placeholder} />
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
        {$title}
        <div className="centered">
          {$fields}
          {$submitButton}
        </div>
        <MatButton className='close-btn' icon='close' onClick={() => {
            hideForm();
            clearForm();
          }} />
      </MatModal>
    );
  }
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
    clearForm: () => { dispatch(clearForm()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
