import React, { Component } from 'react'
import List from './List'

class App extends Component {
  constructor() {
    super()
    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
    const URL = 'http://localhost:9000/tracks'
    const options = { method: 'GET' }

    fetch(URL, options)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(tracks => this.setState(tracks))
    .catch(error => alert(error))
  }

  // componentDidMount() {
  //   const request = new XMLHttpRequest();
  //   request.open("GET", "http://localhost:9000/tracks/1", true);

  //   request.responseType = "arraybuffer";
  //   request.onload = function() {

  //     const context = new AudioContext();
  //     const data = request.response;

  //     context.decodeAudioData(data, buffer => {
  //       let source = context.createBufferSource(); // Create Sound Source
  //       source.buffer = buffer;
  //       source.connect(context.destination);
  //       source.start(context.currentTime);
  //     });
  //   };

  //   request.send();
  // }

  render() {
    return (
      <div className="App">
        <List tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App