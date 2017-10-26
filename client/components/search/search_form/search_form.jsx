import React from 'react';
import { MatButton } from '../../material/index';

class SearchFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: props.query};
  }
  render() {
    const { onQuery } = this.props;
    const { query } = this.state;
    return (
      <form className="search-form" onSubmit={() => { onQuery(query); }}>
        <input type="text"
               autoComplete="off"
               value={query}
               placeholder="Search..."
               onChange={(e) => { this.setState({query: e.target.value}); }}>
        </input>
        <MatButton icon={'search'} isSubmit={true} />
      </form>
    );
  }
}

export default SearchFormComponent;
