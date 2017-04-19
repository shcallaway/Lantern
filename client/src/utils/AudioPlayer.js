const context = new (window.AudioContext || window.webkitAudioContext)()
let source = null
let offset = 0
let start = 0
let gainNode = context.createGain()

const AudioPlayer = {
  adjustVolume: function(value) {

    // translate value in range 0 - 100
    // to value in range minValue - maxValue

    gainNode.gain.value = value
  },
  play: function(data, component) {

    // Store the current time
    start = context.currentTime

    // Decode the audio data
    context.decodeAudioData(data)
    .then(buffer => {

      // Prepare buffer source
      source = context.createBufferSource()
      source.buffer = buffer
      source.connect(gainNode)
      gainNode.connect(context.destination)

      // Play buffer source
      source.start(context.currentTime)

      source.onended = () => {
        component.handleCompletion()
      }
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
    source.connect(gainNode)
    gainNode.connect(context.destination)

    // Start playing from the offset
    source.start(context.currentTime, offset % source.buffer.duration)
  }
}

export default AudioPlayer