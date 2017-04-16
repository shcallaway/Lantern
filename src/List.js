import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <div className="List">
        <ul>
          {this.props.tracks.map(track => {
            return <li>{track}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default List;
