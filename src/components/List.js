import React, { Component } from 'react'
import Track from './Track'

class List extends Component {
  render() {
    return (
      <div className="List">
        {this.props.tracks.map((track, index) => {
          return <Track {...track} key={index} />
        })}
      </div>
    );
  }
}

export default List