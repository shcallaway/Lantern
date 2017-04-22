# Lantern

A simple music streaming app.

## Demo

You can view the application in production [here](https://calm-tundra-94870.herokuapp.com/). *Please be patient while the audio loads, as the Fetch standard does not support audio streaming yet.* A future enhancement may involve using websockets. 

## Technologies

* React/React-Router
* Node/Express
* MySQL
* JS Web Audio API

The production application relies on the following additonal technologies:

* Heroku
* AWS RDS
* AWS S3

## Getting Started

To run the app locally:

```
git clone https://github.com/shcallaway/Lantern.git
cd Lantern
touch .env
```

Open the dotenv file, and provide the following values:

```
HOST=
USERNAME=
PASSWORD=
DATABASE=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

Save the dotenv and start the application.

```
npm start
```

> Note: There are two `package.json` files in this repository, one for the client and one for the server. The `package.json` in the root directory is for the server, but the `npm start` script is configured to build the React client before starting the Node server. 

Visit the application at localhost:9000.

## Running Tests

Lantern uses [Nightwatch](http://nightwatchjs.org/) for automated end-to-end testing. 

To execute the test suite you must first download the Selenium .jar file and the various webdrivers (e.g. geckodriver, chromedriver). Place the .jar in `/nightwatch` the drivers in the `/nightwatch/drivers` respectively. 

You may run the tests from the application root directory with the `nightwatch` command, assuming you installed the CLI using the global tag. You must specify an environment other than default like so:

```
nightwatch -e chrome
```