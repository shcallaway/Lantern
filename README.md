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
DB_HOST=
DB_USER=
DB_PASSWORD=
DATABASE=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
```

Save the dotenv and start the application. 

> The SDK automatically detects AWS credentials set as variables in your environment and uses them for SDK requests, eliminating the need to manage credentials in your application. - [AWS SDK for JavaScript Documentation](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html)

```
npm start
```

> Note: There are two `package.json` files in this repository, one for the client and one for the server. The `package.json` in the root directory is for the server, but the `npm start` script is configured to build the React client before starting the Node server. 

Visit the application at localhost:9000.