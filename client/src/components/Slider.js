import React, { Component } from 'react';

class Slider extends Component {
  constructor() {
    super()
    this.state = {
      volume: 90    
    }
    this.adjustVolume = this.adjustVolume.bind(this)
  }

  // wraps parent method
  adjustVolume(event) {

    // set state is not synchronous, so we need to use callbacks
    this.setState({ volume: event.target.value }, () => {
      this.props.adjustVolume(this.state.volume)
    })
  }

  render() {
    return (
      <div className='Slider'>
        <input type='range' value={this.state.volume} onChange={this.adjustVolume} min='0' max='100' step='1' />
      </div>
    );
  }
}

export default Slider;