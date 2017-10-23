import React from 'react';

import MatButtonComponent from '../../material/mat_button/mat_button';
import { blue, blue_darken_1, orange, orange_darken_1 } from '../../material/mat_color/mat_color';

const TABLE_TYPES = Object.freeze({
  GALLERY: 0,
  LIST: 1,
});

class TableTypePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTableType: TABLE_TYPES.GALLERY
    };
  }
  onButtonClick(tableType) {
    if (this.state.selectedTableType === tableType) { return; }
    this.setState({selectedTableType: tableType});
    if (typeof this.props.onTableTypeChange === 'function') {
      this.props.onTableTypeChange(tableType);
    }
  }
  render() {
    const { selectedTableType } = this.state;

    let galleryBtnClassName = 'table-type-btn gallery-btn';
    if (selectedTableType === TABLE_TYPES.GALLERY) {
      galleryBtnClassName += ' active';
    }

    let listBtnClassName = 'table-type-btn list-btn';
    if (selectedTableType === TABLE_TYPES.LIST) {
      listBtnClassName += ' active';
    }

    return (
      <div className='table-type-picker'>
        <MatButtonComponent buttonClassName={galleryBtnClassName}
                            wrapClassName={'table-type-btn-wrap'}
                            icon={'th-large'}
                            isText={true}
                            onClick={this.onButtonClick.bind(this, TABLE_TYPES.GALLERY)} />

        <MatButtonComponent buttonClassName={listBtnClassName}
                            wrapClassName={'table-type-btn-wrap'}
                            icon={'bars'}
                            isText={true}
                            onClick={this.onButtonClick.bind(this, TABLE_TYPES.LIST)} />
      </div>
    );
  }
}

export default TableTypePickerComponent;
