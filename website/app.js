/* Global Variables */
let baseUrl = "http://api.animalinfo.org/data/animals"
let apiKey = "abc123..."
const newAnimal = document.getElementById("animal").value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(event) {
    event.preventDefault();

    const newAnimal = document.getElementById("animal").value;
    const favoriteFact = document.getElementById("favorite").value;

    getAnimal('/fakeAnimalData')
    // this is new
        .then(function(data) {
            console.log(data);
            // Add data to post request
            let outData = postData('/addAnimal', {
                animal: newAnimal,
                fact: data.fact,
                favFact: favoriteFact
            });

            return outData;
        })
        .then(function(data) { // gets the data from previous .then (outData) as input
            console.log(data);
            updateUI(); // get the newly persisted data over an additional get request
        });
};

const updateUI = async() => {
    const request = await fetch('/all');

    try {
        const allData = await request.json();
        const previousAnimal = document.getElementById('lastAnimal').innerHTML;
        const previousFact = document.getElementById("lastAnimalFact").innerHTML;
        const previousFavFact = document.getElementById("lastAnimalFavFact").innerHTML;
        
        if(previousAnimal !== allData[allData.length-1].animal) {
            document.getElementById('lastAnimal').innerHTML = allData[allData.length-1].animal;
        }
        if(previousFact !== allData[allData.length-1].fact) {
            document.getElementById('lastAnimalFact').innerHTML = allData[allData.length-1].fact;
        }
        if(previousFavFact !== allData[allData.length-1].favFact) {
            document.getElementById('lastAnimalFavFact').innerHTML = allData[allData.length-1].favFact;
        }
    } catch(error) {
        console.log("Error: ", error);
    }
};

const getAnimal = async (url) => {
    // 1.
    // const result = await fetch(baseUrl+animal+apiKey);
    // 2. call fake API
    const result = await fetch("/fakeAnimalData"); // here we send our request to the (Fake-)API
    try {
        const data = await result.json(); // wait until we get back data or throw an error
        console.log(data);
        return data;
    } catch(error) {
        // handle error if it exists
        console.log("Error: ", error);
    }
};

const postData = async (url = "", data = {}) => {
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST', // GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData
    } catch(error) {
        console.log("Error: ", error);
    }
};