const context = new AudioContext()
const source = null

const AudioPlayer = {
  play: function(data) {
    context.decodeAudioData(data, buffer => {
      source = context.createBufferSource()
      source.buffer = buffer
      source.connect(context.destination)
      source.start(context.currentTime)
    })    
  },
  stop: function() {
    if (source) {
      source.stop()
      source = null
    }
  }
}

export default AudioPlayer