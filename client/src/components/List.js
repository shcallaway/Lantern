import React, { Component } from 'react'
import Track from './Track'
import Slider from './Slider'
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
    this.beginPlayback = this.beginPlayback.bind(this)
    this.pausePlayback = this.pausePlayback.bind(this)
    this.resumePlayback = this.resumePlayback.bind(this)
    this.defaultPlayback = this.defaultPlayback.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
  }

  adjustVolume(volume) {
    AudioPlayer.adjustVolume(volume / 100)
  }

  defaultPlayback() {
    const id = this.props.tracks[0].id
    this.beginPlayback(id)
  }

  beginPlayback(id) {

    AudioPlayer.stop()
    inQueue = id

    // Get the full track object
    let track, current
    for (let i = 0; i < this.props.tracks.length; i++) {
      current = this.props.tracks[i]
      if (current.id === id) {
        track = current
        break
      }
    }

    this.setState({ 
      status: PlayerStatus.LOADING,
      track: track
    })

    const URL = `/tracks/${id}/stream`
    const options = { method: 'GET' }

    fetch(URL, options)
    .then(response => response.arrayBuffer())
    .then(data => {

      // Protect against callbacks from out-of-date requests
      if (inQueue !== id) {
        return
      }

      this.setState({ 
        status: PlayerStatus.PLAYING
      })

      AudioPlayer.play(data, this)
    })
  }

  handleCompletion() {

    // If the track is simply paused...
    if (this.state.status === PlayerStatus.PAUSED) return

    let tracks = this.props.tracks
    let current = this.state.track

    // If current track is last...
    if (current.id === tracks[tracks.length - 1].id) {

      // Re-initialize state
      this.setState({
        track: null,
        status: null
      })
      
      return
    }

    // Otherwise, play the next track
    let index = tracks.indexOf(current) + 1
    this.beginPlayback(tracks[index].id)
  }

  pausePlayback() {
    AudioPlayer.pause()

    this.setState({ 
      status: PlayerStatus.PAUSED
    })
  }

  resumePlayback() {
    AudioPlayer.resume()

    this.setState({
      status: PlayerStatus.PLAYING
    })
  }

  render() {
    let button, thumbnail, loading
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
            aria-hidden='true' onClick={this.pausePlayback}></i>
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
            aria-hidden='true' onClick={this.resumePlayback}></i>
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
            aria-hidden='true' onClick={this.defaultPlayback}></i>
          </div>
        )
        break
    }

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

    return (
      <div className='List'>
        <div className='Tracks'>
          {this.props.tracks.map((track, index) => {
            return (
              <Track {...track} key={index} beginPlayback={this.beginPlayback} />
              )
          })}
        </div>
        <div className='Controls'>
          {button}
          {info}
          <Slider adjustVolume={this.adjustVolume} />
        </div>
      </div>
    );
  }
}

export default List