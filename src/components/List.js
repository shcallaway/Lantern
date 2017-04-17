import React, { Component } from 'react'
import Track from './Track'
import AudioPlayer from '../utils/AudioPlayer';

class List extends Component {
  constructor() {
    super()
  }

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

  pause() {
    AudioPlayer.pause()
  }

  resume() {
    AudioPlayer.resume()
  }

  render() {
    return (
      <div className='List'>
        {this.props.tracks.map((track, index) => {
          return <Track {...track} key={index} play={this.play} />
        })}
        <div className='Controls'>
          <button onClick={this.stop.bind(this)}>Stop</button>
          <button onClick={this.pause.bind(this)}>Pause</button>
          <button onClick={this.resume.bind(this)}>Resume</button>
        </div>
      </div>
    );
  }
}

export default List