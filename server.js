/* Empty JS object to act as endpoint for all routes */
let weatherUserData = [];

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening(){
  console.log(`running on localhost: ${port}`);
};

// Dummy API Endpoint
const fakeData = {
  animal: 'lion',
  fact: 'lions are sweet'
}

// GET Routes
app.get('/all', getAllData);

function getAllData(request, response) {
  console.log(weatherUserData);
  response.send(weatherUserData);
}

// POST Route Weather
app.post('/addWeatherUserData', addWeatherUserData);

function addWeatherUserData(request, response) {
  newEntry = {
    cod: request.body.cod,
    date: request.body.date,
    coord: request.body.coord,
    weather: request.body.weather,
    main: request.body.main,
    visibility: request.body.visibility,
    wind: request.body.wind,
    sys: request.body.sys,
    userZip: request.body.userZip,
    userFeelings: request.body.userFeelings
  };

  weatherUserData.unshift(newEntry);
  response.send(weatherUserData);
}