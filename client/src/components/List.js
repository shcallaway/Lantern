import React, { Component } from 'react'
import Track from './Track'
import AudioPlayer from '../utils/AudioPlayer'

const PlayerStatus = {
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
}

let inQueue = null

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
    AudioPlayer.stop()

    // Keep track of the most recently queued track id
    inQueue = id

    // Get the full track object
    let track
    for (var i = 0; i < this.props.tracks.length; i++) {
      let current = this.props.tracks[i]
      if (current.id === id) {
        track = current
        break
      }
    }

    this.setState({ 
      status: PlayerStatus.LOADING,
      track: track
    })

    const URL = `https://calm-tundra-94870.herokuapp.com/tracks/${id}/stream`
    const options = { method: 'GET' }

    fetch(URL, options)
    .then(response => response.arrayBuffer())
    .then(data => {

      // Protect against callbacks from out-of-date requests
      if (inQueue != id) {
        return
      }

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

    let info
    if (this.state.status) {
      info = (
        <div className='Info'>
          <div>
            {this.state.track.title} ({this.state.status})
          </div>
          <div className='Artist'>
            {this.state.track.artist}
          </div>
        </div>
      )
    }

    let button, thumbnail
    switch (this.state.status) {
      case PlayerStatus.LOADING:
        button = (
          <div>
            <i className='fa fa-pause-circle fa-3' aria-hidden='true'></i>
          </div>
        )
        thumbnail = (
          <img src={this.state.track.img} className='Thumbnail' />
        )
        break
      case PlayerStatus.PLAYING:
        button = (
          <div>
            <i className='fa fa-pause-circle fa-3' 
            aria-hidden='true' onClick={this.pause.bind(this)}></i>
          </div>
        )
        thumbnail = (
          <img src={this.state.track.img} className='Thumbnail' />
        )
        break
      case PlayerStatus.PAUSED:
        button = (
          <div>
            <i className='fa fa-play-circle fa-3' 
            aria-hidden='true' onClick={this.resume.bind(this)}></i>
          </div>
        )
        thumbnail = (
          <img src={this.state.track.img} className='Thumbnail' />
        )
        break
      default:
        button = (
          <div>
            <i className='fa fa-play-circle fa-3' 
            aria-hidden='true' onClick={this.default.bind(this)}></i>
          </div>
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
          {button}
          {info}
          {thumbnail}
        </div>
      </div>
    );
  }
}

export default List