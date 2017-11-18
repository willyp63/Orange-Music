import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { MatModal } from '../material';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { MenuList, MenuItem } from 'material-ui/Menu';
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
      hideForm, playlists } = this.props;

    if (!schema) { return <noscript />; }

    const $inputs = schema.fields
      .filter(fieldSchema => fieldSchema.type !== 'hidden')
      .map(fieldSchema => {
        const field = fields[fieldSchema.name] || {errors: []};
        const hasErrors = field.errors.length > 0;

        switch(fieldSchema.type) {
          case 'playlist-picker':
            return (
                <MenuList className='picker-field' key={fieldSchema.name}>
                  {playlists.map(playlist => {
                    return (
                      <MenuItem key={playlist.name} onClick={() => {
                        setFieldValue(fieldSchema.name, playlist);
                        schema.submitAction();
                      }}>
                        {playlist.name}
                      </MenuItem>
                    );
                  })}
                  <span className='field-errors'>{field.errors[0]}</span>
                </MenuList>
              );
          default:
            return (
              <TextField className={classNames('text-field', {errors: hasErrors})}
                         value={field.value}
                         onChange={e => setFieldValue(fieldSchema.name, e.target.value)}
                         label={fieldSchema.label}
                         error={hasErrors}
                         inputProps={{type: fieldSchema.isPassword ? 'password' : 'text'}}
                         helperText={field.errors[0] || ' '}
                         key={fieldSchema.name} />
            );
        }
        
      });

    const $submitButton = schema.submitButtonText
      ? (
        <Button className='submit-btn' onClick={submitForm} raised={true}>
          {schema.submitButtonText}
        </Button>
      ) : '';

    const $altButton = schema.altButtonText
      ? (
        <Button className='alt-btn' onClick={schema.altAction} raised={true}>
          {schema.altButtonText}
        </Button>
      ) : '';

    const $buttonDivider = $altButton ? (<div className='divider'>OR</div>) : '';

    return (
      <MatModal className='om-form' isOpen={isOpen}>
        <Button className='close-btn' onClick={hideForm}>
          <i className='material-icons'>close</i>
        </Button>
        <div className='title'>
          {schema.title}
        </div>
        <div className='content'>
          {$inputs}
          <div className='buttons'>
            {$submitButton}
            {$buttonDivider}
            {$altButton}
          </div>
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
    playlists: state.playlists.playlists.playlists,
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
