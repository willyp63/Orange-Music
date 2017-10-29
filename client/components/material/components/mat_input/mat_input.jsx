import React from 'react';
import MatButton from '../mat_button/mat_button';
import { isNotEmpty } from '../../../../util/empty';

class MatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFocused: false};
  }
  render() {
    const { value, buttonIcon, placeholder, onValueChange, onButtonClick } = this.props;
    const { isFocused } = this.state;

    let placeholderClassName = 'placeholder';
    if (isFocused || isNotEmpty(value)) { placeholderClassName += ' lifted'; }

    let underlineClassName = 'underline';
    if (isFocused) { underlineClassName += ' filled'; }

    const $iconButton = buttonIcon
      ? (
        <MatButton icon={buttonIcon} onClick={onButtonClick} />
      )
      : '';

    return (
      <div className='mat-input'>
        <div className='placeholder-container'>
          <span className={placeholderClassName}>{placeholder}</span>
        </div>
        <div className='input-container'>
          <input type="text"
                 autoComplete="off"
                 value={value}
                 onFocus={() => { this.setState({isFocused: true}); }}
                 onBlur={() => { this.setState({isFocused: false}); }}
                 onChange={(e) => { onValueChange(e.target.value); }} />
          {$iconButton}
        </div>
        <div className={underlineClassName}>
          <div></div>
        </div>
      </div>
    );
  }
}

export default MatInput;
