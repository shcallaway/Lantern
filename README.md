# Lantern

A simple music streaming app.

## Getting Started

To run the app locally, 

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

## Technologies

* React/React-Router
* Node/Express
* MySQL
* JS Web Audio API

## Demo

You can view the application in production [here](https://calm-tundra-94870.herokuapp.com/). Please be patient while the audio loads, as the Fetch standard does not support audio streaming yet.

The production application relies on the following additonal technologies:

* Heroku
* AWS RDS
* AWS S3