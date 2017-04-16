import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <div className="List">
        {this.props.tracks.map(track => {
          return (
            <div>
              {track.title}
            </div>
          )
        })}
      </div>
    );
  }
}

export default List;
