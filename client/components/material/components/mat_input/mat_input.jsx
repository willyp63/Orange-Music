import React from 'react';
import MatButton from '../mat_button/mat_button';
import { isNotEmpty } from '../../../../util/empty';

class MatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFocused: false};
  }
  render() {
    const { value, placeholder, onValueChange, onButtonClick, className } = this.props;
    const { isFocused } = this.state;

    let className1 = className ? className + ' mat-input' : 'mat-input';

    let placeholderClassName = 'placeholder';
    if (isFocused || isNotEmpty(value)) { placeholderClassName += ' lifted'; }

    let underlineClassName = 'underline';
    if (isFocused) { underlineClassName += ' filled'; }

    return (
      <div className={className1}>
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
        </div>
        <div className={underlineClassName}>
          <div></div>
        </div>
      </div>
    );
  }
}

export default MatInput;
