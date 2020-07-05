import React from 'react';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';

import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <vaadin-grid column-reordering-allowed ref="grid">
          <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
          <vaadin-grid-filter-column path="name" header="Name"/>
          <vaadin-grid-column path="height" header="Height"/>
          <vaadin-grid-column path="mass" header="Mass"/>
        </vaadin-grid>
      </div>
    );
  }

  componentDidMount() {
    this.refs.grid.pageSize = 10; //SWAPI uses default page size of 10
    this.refs.grid.dataProvider = function (params, callback) {
      let url = 'https://swapi.dev/api/people?page=' + (params.page + 1); //SWAPI pages start from 1 not 0
      if (params.filters.length > 0) {
        url = 'https://swapi.dev/api/people?search=' + (params.filters[0].value);
      } else {
        url = 'https://swapi.dev/api/people?page=' + (params.page + 1);
      }
      axios.get(url)
        .then(res => {
          callback(res.data.results, res.data.count);
        });
    };
  };
};

export default App;
