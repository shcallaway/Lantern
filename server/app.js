const express = require('express')
const morgan = require('morgan')
const path = require('path')
const chalk = require('chalk')
const s3 = require('aws-sdk/clients/s3')
const dotenv = require('dotenv')
const sass = require('node-sass-middleware')
const database = require('./database')

dotenv.config()

// The AWS SDK automatically finds credentials from environment vars
const client = new s3({
  params: {
    Bucket: process.env.AWS_BUCKET // But we have to explicitly provide this
  }
})

// Initialize the server
const app = express()

// Setup logging
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// Setup sass middleware
app.use(sass({
  // debug: true,
  src:  path.resolve(__dirname, '../client/public/sass'),
  dest: path.resolve(__dirname, '../client/public'),
  indentedSyntax: true,
  outputStyle: 'compressed'
}));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../client/build')))

// Declare server-side routes
app.get('/tracks', (req, res) => {

  process.stdout.write('Server received a request: ')
  console.log(chalk.blue(`${req.method} ${req.url}`))

  // Query the database for all tracks
  database.query('SELECT * FROM Tracks', (error, results, fields) => {

    // Upon failure...
    if (error) {
      process.stdout.write('Database query threw an error: ')
      console.log(chalk.red(error.code))

      res.sendStatus(500)
    }

    // Upon success...
    const data = { tracks: results }
    res.status(200).json(data)
  })
})

app.get('/tracks/:id([0-9]*)/stream', (req, res) => {

  process.stdout.write('Server received a request: ')
  console.log(chalk.blue(`${req.method} ${req.url}`))

  const id = req.params.id

  // Query the database for all tracks
  database.query(`SELECT * FROM Tracks WHERE id = ${id}`, (error, results, fields) => {

    // Upon failure...
    if (error) {
      process.stdout.write('Database query threw an error: ')
      console.log(chalk.red(error.code))

      res.sendStatus(500)
    }

    // Replace true URL with a pre-signed temporary one
    const track = results[0]
    track.url = getSignedURL(track.key)
    res.status(200).json(track)
  })
});

function getSignedURL(key) {

  // Docs: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
  return client.getSignedUrl('getObject', {
    Key: key,
    Expires: 60 // URL expires in 1 minute
  })
}

// This was included with the node boilerplate I referenced
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
// });

module.exports = app