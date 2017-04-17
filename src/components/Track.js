import React, { Component } from 'react';

class Track extends Component {
  handleClick() {
    this.props.play(this.props.id)
  }

  render() {
    return (
      <div className="Track" onClick={this.handleClick.bind(this)}>
        <div>
          {this.props.id}
        </div>
        <div>
          {this.props.title}
        </div>
      </div>
    );
  }
}

export default Track;
