import React from 'react';
import MatButtonComponent from '../../material/mat_button/mat_button';

export const DISPLAY_TYPES = Object.freeze({
  GALLERY: 0,
  LIST: 1,
});

class TableTypePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDisplayType: props.initialDisplayType || DISPLAY_TYPES.GALLERY
    };
  }
  onButtonClick(selectedDisplayType) {
    if (this.state.selectedDisplayType === selectedDisplayType) { return; }
    this.setState({selectedDisplayType});
    if (typeof this.props.onDisplayTypeChange === 'function') {
      this.props.onDisplayTypeChange(selectedDisplayType);
    }
  }
  render() {
    const { selectedDisplayType } = this.state;

    let galleryBtnClassName = 'table-type-btn gallery-btn';
    if (selectedDisplayType === DISPLAY_TYPES.GALLERY) {
      galleryBtnClassName += ' active';
    }

    let listBtnClassName = 'table-type-btn list-btn';
    if (selectedDisplayType === DISPLAY_TYPES.LIST) {
      listBtnClassName += ' active';
    }

    return (
      <div className='table-type-picker'>
        <MatButtonComponent buttonClassName={galleryBtnClassName}
                            wrapClassName={'table-type-btn-wrap'}
                            icon={'th-large'}
                            isText={true}
                            onClick={this.onButtonClick.bind(this, DISPLAY_TYPES.GALLERY)} />

        <MatButtonComponent buttonClassName={listBtnClassName}
                            wrapClassName={'table-type-btn-wrap'}
                            icon={'bars'}
                            isText={true}
                            onClick={this.onButtonClick.bind(this, DISPLAY_TYPES.LIST)} />
      </div>
    );
  }
}

export default TableTypePickerComponent;
