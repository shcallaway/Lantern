import React, { Component } from 'react'
import Track from './Track'
import AudioPlayer from '../utils/AudioPlayer';

const PlayerStatus = {
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
}

class List extends Component {
  constructor() {
    super()
    this.state = {
      track: null,
      status: null
    }
  }

  default() {
    this.play(this.props.tracks[0].id)
  }

  play(id) {
    const URL = `http://localhost:9000/tracks/${id}/stream`
    const options = { method: 'GET' }

    // Stop stream
    AudioPlayer.stop()

    // Find track by id
    let track
    for (var i = 0; i < this.props.tracks.length; i++) {
      let current = this.props.tracks[i]
      if (current.id === id) {
        track = current
        break
      }
    }

    // Set loading
    this.setState({ 
      status: PlayerStatus.LOADING,
      track: track
    })

    // Request data
    fetch(URL, options)
    .then(response => response.arrayBuffer())
    .then(data => {

      this.setState({ 
        status: PlayerStatus.PLAYING
      })

      AudioPlayer.play(data)
    })
  }

  pause() {
    AudioPlayer.pause()

    this.setState({ 
      status: PlayerStatus.PAUSED
    })
  }

  resume() {
    AudioPlayer.resume()

    this.setState({
      status: PlayerStatus.PLAYING
    })
  }

  render() {

    let info, button
    switch (this.state.status) {
      case PlayerStatus.LOADING:
        info = (
          <p>{this.state.track.title} (Loading)</p>
        )
        button = (
          <button onClick={this.pause.bind(this)}>
          </button>
        )
        break
      case PlayerStatus.PLAYING:
        info = (
          <p>{this.state.track.title} (Playing)</p>
        )
        button = (
          <button onClick={this.pause.bind(this)}></button>
        )
        break
      case PlayerStatus.PAUSED:
        info = (
          <p>{this.state.track.title} (Paused)</p>
        )
        button = (
          <button onClick={this.resume.bind(this)}></button>
        )
        break
      default:
        button = (
          <button onClick={this.default.bind(this)}></button>
        )
        break
    }

    return (
      <div className='List'>
        <div className='Tracks'>
          {this.props.tracks.map((track, index) => {
            return <Track {...track} key={index} play={this.play.bind(this)} />
          })}
        </div>
        <div className='Controls'>
          <div>
            {button}
          </div>
          <div>
            {info}
          </div>
        </div>
      </div>
    );
  }
}

export default List