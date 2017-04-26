import React, { Component } from 'react'
import Track from './Track'
import Slider from './Slider'
// import WebAudio from '../utils/WebAudio'
import AudioPlayer from '../utils/AudioPlayer'

const PlayerStatus = {
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
}

// inQueue should be made into
// a real queue, to handle scenario
// when user double-clicks the
// same track (currently, both
// callbacks come back and make
// it past the inQueue check)
let inQueue = null

class List extends Component {
  constructor() {
    super()
    this.state = {
      track: null,
      status: null
    }

    this.clickRouter = this.clickRouter.bind(this)
    this.beginPlayback = this.beginPlayback.bind(this)
    this.pausePlayback = this.pausePlayback.bind(this)
    this.resumePlayback = this.resumePlayback.bind(this)
    this.playFirstTrack = this.playFirstTrack.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.onCompletion = this.onCompletion.bind(this)
  }

  clickRouter(id) {
    const noTrack = this.state.track === null
    if (noTrack) {
      this.beginPlayback(id)
      return
    }

    const trackMatches = this.state.track.id === id
    const statusPlaying = this.state.status === PlayerStatus.PLAYING
    const statusPaused = this.state.status === PlayerStatus.PAUSED

    if (trackMatches && statusPlaying) {
      this.pausePlayback()
    } else if (trackMatches && statusPaused) {
      this.resumePlayback()
    } else {
      this.beginPlayback(id)
    }
  }

  adjustVolume(value) {
    AudioPlayer.setVolume(value / 100)
  }

  playFirstTrack() {
    const id = this.props.tracks[0].id
    this.beginPlayback(id)
  }

  getTrackFromId(id) {
    for (let i = 0; i < this.props.tracks.length; i++) {
      let current = this.props.tracks[i]
      if (current.id === id) return current
    }
  }

  beginPlayback(id) {
    this.setState({ 
      status: PlayerStatus.LOADING,
      track: this.getTrackFromId(id)
    }, () => {
      AudioPlayer.stop()

      // needs refactoring
      inQueue = id
    })

    const URL = `/tracks/${id}/stream`
    fetch(URL, { method: 'GET' })
    .then(response => response.json())
    .then(track => {

      // protect against callbacks from out-of-date requests
      if (inQueue !== id) {
        return
      }

      console.log('got track!')
      console.log(track)

      AudioPlayer.play(track.url, this.onLoad, this.onCompletion)
      // WebAudio.play(data, this.onCompletion)
    })
  }

  getFinalTrack() {
    return this.props.tracks[this.props.tracks.length - 1]
  }

  onFinalTrack() {
    const current = this.state.track
    const final = this.getFinalTrack()
    return current.id === final.id ? true : false
  }

  playNextTrack() {
    const index = this.props.tracks.indexOf(this.state.track)
    const next = this.props.tracks[index + 1]
    this.beginPlayback(next.id)      
  }

  onLoad() {
    console.log(this)
    this.setState({ status: PlayerStatus.PLAYING })
  }

  onCompletion() {
    console.log('handling completion')

    // completion gets called under three scenarios:
    // 1. the source finishes playing the buffer (play next)
    // 2. the track is paused, and source.stop is called (do nothing)
    // 3. a new track is loading, and source.stop is called (do nothing)

    const statusLoading = this.state.status === PlayerStatus.LOADING
    const statusPaused = this.state.status === PlayerStatus.PAUSED
    if (statusLoading || statusPaused) return

    console.log('actual completion scenario')

    if (this.onFinalTrack()) {
      this.setState({
        track: null,
        status: null
      })
    } else {
      this.playNextTrack()
    }
  }

  pausePlayback() {
    this.setState({ 
      status: PlayerStatus.PAUSED
    }, () => {
      AudioPlayer.pause()
      // WebAudio.pause()
    })
  }

  resumePlayback() {
    this.setState({
      status: PlayerStatus.PLAYING
    }, () => {
      AudioPlayer.resume(this.onCompletion)
      // WebAudio.resume(this.onCompletion)      
    })
  }

  loadingButton() {
    return (
      <div>
        <i className='fa fa-pause-circle fa-3' aria-hidden='true'></i>
      </div>
    )
  }

  pauseButton() {
    return (
      <div>
        <i className='fa fa-pause-circle fa-3' 
        aria-hidden='true' onClick={this.pausePlayback}></i>
      </div>
    )
  }

  resumeButton() {
    return (
      <div>
        <i className='fa fa-play-circle fa-3' 
        aria-hidden='true' onClick={this.resumePlayback}></i>
      </div>
    )
  }

  defaultButton() {
    return (
      <div>
        <i className='fa fa-play-circle fa-3' 
        aria-hidden='true' onClick={this.playFirstTrack}></i>
      </div>
    )
  }

  assignButton() {
    switch (this.state.status) {
      case PlayerStatus.LOADING:
        return this.loadingButton()
      case PlayerStatus.PLAYING:
        return this.pauseButton()
      case PlayerStatus.PAUSED:
        return this.resumeButton()
      default:
        return this.defaultButton()
    }
  }

  assignInfo() {
    if (!this.state.status) return

    return (
      <div className='Info'>
        <div>{this.state.track.title} ({this.state.status})</div>
        <div className='Artist'>{this.state.track.artist}</div>
      </div>
    )
  }

  render() {
    let button = this.assignButton()
    let info = this.assignInfo()

    return (
      <div className='List'>
        <div className='Tracks'>
          {this.props.tracks.map((track, index) => 
            <Track {...track} key={index} clickRouter={this.clickRouter} />
          )}
        </div>
        <div className='Controls'>
          {button}
          {info}
          <Slider adjustVolume={this.adjustVolume} />
        </div>
      </div>
    )
  }
}

export default List