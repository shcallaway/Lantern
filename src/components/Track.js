import React, { Component } from 'react';

const context = new AudioContext()
const source = context.createBufferSource()

class Track extends Component {
  constructor() {
    super()
    this.state = {
      source: null
    }
  }

  play() {
    const URL = `http://localhost:9000/tracks/${this.props.id}/stream`
    const options = { method: 'GET' }

    fetch(URL, options)
    .then(response => response.arrayBuffer())
    .then(response => {
      context.decodeAudioData(response, buffer => {
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(context.currentTime);
      });
    })
  }

  stop() {
    source.stop()
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
        <button onClick={this.play.bind(this)}>Play</button>
        <button onClick={this.stop.bind(this)}>Stop</button>
      </div>
    );
  }
}

export default Track;
