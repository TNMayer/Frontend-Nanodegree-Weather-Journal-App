/* Empty JS object to act as endpoint for all routes */
projectData = {};
let animalData = [];

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
  // console.log(server);
  console.log(`running on localhost: ${port}`);
};

// Dummy API Endpoint
const fakeData = {
  animal: 'lion',
  fact: 'lions are sweet'
}

// GET Routes
app.get('/fakeAnimalData', getFakeData);

function getFakeData(request, response) {
  response.send(fakeData);
}

app.get('/all', getAllData);

function getAllData(request, response) {
  console.log(animalData);
  response.send(animalData);
}

// POST Route
app.post('/addAnimal', addAnimal);

function addAnimal(request, response) {
  newEntry = {
    animal: request.body.animal,
    fact: request.body.fact,
    favFact: request.body.favFact
  }

  animalData.push(newEntry);
  response.send(animalData);
}