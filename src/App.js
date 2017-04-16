import React, { Component } from 'react';
import List from './List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <List tracks={["One", "Two", "Three"]} />
      </div>
    );
  }
}

export default App;
