import React from 'react';
import MatButton from '../mat_button/mat_button';
import MatInput from '../mat_input/mat_input';

class MatPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }
  render() {
    const { options, onOptionSelect, formatter } = this.props;
    const { query } = this.state;

    const $options = options.map(option => {
      const text = typeof formatter === 'function' ? formatter(option) : option;
      return (
        <MatButton text={text} onClick={onOptionSelect.bind(null, option)} key={text} />
      );
    });

    const $input = options.length > 5
      ? (<MatInput value={query}
                   placeholder='Search ...'
                   onValueChange={(newValue) => this.setState({query: newValue})} />) : '';

    return (
      <div className='mat-picker'>
        {$input}
        <div className='options'>{$options}</div>
      </div>
    );
  }
}
export default MatPicker;
