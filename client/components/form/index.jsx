import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { MatModal } from '../material';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { setFieldValue, submitForm, hideForm } from '../../store/modules/form';

class Form extends React.Component {
  componentDidUpdate() {
    // Focus first text field when form first opens.
    if (this.props.isOpen) {
      if (!this.isOpen) {
        const $firstInput = $('.mat-modal .text-field input')[0];
        if ($firstInput) { $firstInput.focus(); }
        this.isOpen = true;
      }
    } else {
      this.isOpen = false;
    }
  }
  render() {
    const { isOpen, schema, fields, setFieldValue, submitForm,
      hideForm } = this.props;

    if (!schema) { return <noscript />; }

    const $textFields = schema.fields.map(fieldSchema => {
      const field = fields[fieldSchema.name] || {errors: []};
      const hasErrors = field.errors.length > 0;
      return (
        <TextField className={classNames('text-field', {errors: hasErrors})}
                   value={field.value}
                   onChange={e => setFieldValue(fieldSchema.name, e.target.value)}
                   label={fieldSchema.label}
                   error={hasErrors}
                   helperText={field.errors[0] || ' '}
                   key={fieldSchema.name} />
      );
    });

    return (
      <MatModal className='om-form' isOpen={isOpen}>
        <Button className='close-btn' onClick={hideForm}>
          <i className='material-icons'>close</i>
        </Button>
        <div className='content'>
          {$textFields}
          <Button className='submit-btn' onClick={submitForm} raised={true}>
            {schema.submitButtonText}
          </Button>
        </div>
      </MatModal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    schema: state.form.schema,
    fields: state.form.fields,
    isOpen: state.form.isOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFieldValue: (fieldName, value) => dispatch(setFieldValue(fieldName, value)),
    hideForm: () => dispatch(hideForm()),
    submitForm: () => dispatch(submitForm()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
