import React, { Component } from 'react';

class Track extends Component {
  constructor() {
    super()
    this.beginPlayback = this.beginPlayback.bind(this)
  }

  // wraps parent method
  beginPlayback() {
    this.props.beginPlayback(this.props.id)
  }

  render() {
    return (
      <div className='Track' onClick={this.beginPlayback}>
        <div>
          {this.props.title}
        </div>
        <div className='Artist'>
          {this.props.artist}
        </div>
      </div>
    );
  }
}

export default Track;
