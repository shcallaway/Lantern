import React, { Component } from 'react'
import Track from './Track'
import AudioPlayer from '../utils/AudioPlayer';

class List extends Component {
  play(id) {
    const URL = `http://localhost:9000/tracks/${id}/stream`
    const options = { method: 'GET' }

    AudioPlayer.stop()

    fetch(URL, options)
    .then(response => response.arrayBuffer())
    .then(data => {
      AudioPlayer.play(data)
    })
  }

  stop() {
    AudioPlayer.stop()
  }

  render() {
    return (
      <div className="List">
        {this.props.tracks.map((track, index) => {
          return <Track {...track} key={index} play={this.play} />
        })}
        <button onClick={this.stop.bind(this)}>Stop</button>
      </div>
    );
  }
}

export default List