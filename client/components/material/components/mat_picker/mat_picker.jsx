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
    const { options, onOptionSelect } = this.props;
    const { query } = this.state;

    const $options = options.map(option => {
      return (
        <MatButton text={option} onClick={onOptionSelect.bind(null, option)} key={option} />
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
