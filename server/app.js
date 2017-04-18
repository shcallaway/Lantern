const express = require('express')
const morgan = require('morgan')
const path = require('path')
const chalk = require('chalk')
const s3 = require('s3')
const dotenv = require('dotenv')
const sass = require('node-sass-middleware')

dotenv.config()

// Set up s3 credentials
var client = s3.createClient({  
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

const database = require('./database')

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
app.use(express.static(path.resolve(__dirname, '..', 'build')))

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

app.get('/tracks/:id/stream', (req, res) => {

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

    // Upon success...
    const params = {
      Bucket: 'lantern-dev',
      Key: results[0].key
    };

    // Download stream and pipe to client
    const stream = client.downloadStream(params)
    stream.pipe(res)
  })
});

// This was included with the node boilerplate I referenced
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
// });

module.exports = app