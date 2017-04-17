import React, { Component } from 'react';

class Track extends Component {
  handlePlay() {
    this.props.play(this.props.id)
  }

  render() {
    return (
      <div className="Track">
        <div>
          {this.props.id}
        </div>
        <div>
          {this.props.title}
        </div>
        <button onClick={this.handlePlay.bind(this)}>Play</button>
      </div>
    );
  }
}

export default Track;
