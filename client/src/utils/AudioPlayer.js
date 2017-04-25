import { Howl } from './Howler'
// import Client from './S3'

class AudioPlayer {
  constructor() {
    this.howler
  }

  adjustVolume() {

  }

  play(key) {

    // Download stream and pipe to client
    // const stream = Client.downloadStream(params)
    
    // const options = { 
    //   src: [url],
    //   autoplay: true,
    //   volume: 0.5,
    //   onend: function() {
    //     console.log('Finished!');
    //   }
    // }

    // this.howler = new Howl(options)
  }

  stop() {

  }

  pause() {

  }

  resume() {

  }
}

export default new AudioPlayer()