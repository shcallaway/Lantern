import React, { Component } from 'react';

class Track extends Component {
  render() {
    return (
      <div className="Track">
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
