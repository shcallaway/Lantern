import React, { Component } from 'react';

class Track extends Component {
  handleClick() {
    this.props.play(this.props.id)
  }

  render() {
    return (
      <div className='Track' onClick={this.handleClick.bind(this)}>
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
