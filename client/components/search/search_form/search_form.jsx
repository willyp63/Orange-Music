import React from 'react';
import ReactDOM from 'react-dom';
import { MatInput, measureText, FONT_TYPES, GRID } from '../../material/index';

const DEFAULT_MAT_INPUT_WIDTH = GRID * 60;

class SearchFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: props.query};
  }
  componentWillReceiveProps(newProps) {
    if (newProps.query === this.state.query) { return; }
    this.setState({query: newProps.query});
  }
  onQueryChange(query) {
    this.setState({query});
    const queryWidth = measureText(query, FONT_TYPES.DISPLAY_1);
    const $searchForm = $(ReactDOM.findDOMNode(this));
    const $matInput = $searchForm.find('.mat-input');
    if (queryWidth > DEFAULT_MAT_INPUT_WIDTH) {
      const searchFormWidth = $searchForm.width();
      if (queryWidth < searchFormWidth) {
        $matInput.width(queryWidth);
      } else {
        $matInput.width(searchFormWidth);
      }
    } else {
      $matInput.width(DEFAULT_MAT_INPUT_WIDTH);
    }
  }
  render() {
    const { onQuery } = this.props;
    const { query } = this.state;
    return (
      <form className="search-form" onSubmit={() => { onQuery(query); }}>
        <MatInput value={query}
                  placeholder="Search for tracks or artists"
                  onValueChange={this.onQueryChange.bind(this)}
                  onButtonClick={() => { onQuery(query); }} />
      </form>
    );
  }
}

export default SearchFormComponent;
