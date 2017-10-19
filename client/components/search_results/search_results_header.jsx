import React from 'react';

import TABLE_SCHEMA from './search_results_schema';

const SearchResultsHeaderComponent = () => {
  const columnHeaders = Object.keys(TABLE_SCHEMA).map((field) => (
    <div className="column-header"
         style={{flex: `0 0 ${TABLE_SCHEMA[field].width}%`}}
         key={field}>
      {TABLE_SCHEMA[field].label}
    </div>
  ));

  return (
    <div className="search-results-header">
      {columnHeaders}
    </div>
  );
}

export default SearchResultsHeaderComponent;
