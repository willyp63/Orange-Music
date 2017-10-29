import React from 'react';
import ReactDOM from 'react-dom';
import { MatInput, measureText, FONT_TYPES, GRID } from '../../material/index';

const DEFAULT_MAT_INPUT_WIDTH = GRID * 50;

class SearchFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: props.query};
  }
  onQueryChange(query) {
    this.setState({query}, () => {
      const queryWidth = measureText(query, FONT_TYPES.DISPLAY_1);
      const $searchForm = $(ReactDOM.findDOMNode(this));
      const $matInput = $searchForm.find('.mat-input');
      const $input = $matInput.find('input');
      const newWidth = $matInput.width() + queryWidth - $input.width();
      if (newWidth > DEFAULT_MAT_INPUT_WIDTH) {
        const searchFormWidth = $searchForm.width();
        if (newWidth < searchFormWidth) {
          $matInput.width(newWidth);
        } else {
          $matInput.width(searchFormWidth);
        }
      } else {
        $matInput.width(DEFAULT_MAT_INPUT_WIDTH);
      }
    });
  }
  render() {
    const { onQuery } = this.props;
    const { query } = this.state;
    return (
      <form className="search-form" onSubmit={() => { onQuery(query); }}>
        <MatInput value={query}
                  buttonIcon='search'
                  placeholder="Search for tracks or artists"
                  onValueChange={this.onQueryChange.bind(this)}
                  onButtonClick={() => { onQuery(query); }} />
      </form>
    );
  }
}

export default SearchFormComponent;
