const context = new AudioContext()
let source = null
let offset = 0
let start = 0

const AudioPlayer = {
  play: function(data) {

    // Store the current time
    start = context.currentTime

    // Decode the audio data
    context.decodeAudioData(data, buffer => {

      // Create a new buffer source
      source = context.createBufferSource()
      source.buffer = buffer
      source.connect(context.destination)

      // Start playing immediately
      source.start(context.currentTime)
    })    
  },
  stop: function() {

    // Check for source
    if (!source) {
      return
    }

    // Stop playing
    source.stop()

    // Reset everything
    source = null
    start = 0
    offset = 0
  },
  pause: function() {

    // Check for source
    if (!source) {
      return
    }

    // Stop playing
    source.stop()

    // Add to the offset
    offset += context.currentTime - start
  },
  resume: function() {

    // Check for source
    if (!source) {
      return
    }

    // Update the track start time
    start = context.currentTime

    // Capture the buffer from the source
    let buffer = source.buffer

    // Create a new source with the same buffer
    source = context.createBufferSource()
    source.buffer = buffer
    source.connect(context.destination)

    // Start playing from the offset
    source.start(context.currentTime, offset % source.buffer.duration)
  }
}

export default AudioPlayer