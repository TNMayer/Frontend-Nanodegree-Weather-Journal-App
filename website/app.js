/* Global Variables */
let weatherApiKey = "f7bfc3234b1cee0b3c125998...";
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + ((d.getMonth()+1)<10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1)) + '.' + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(event) {
    event.preventDefault();

    getUserWeatherData(weatherApiUrl, weatherApiKey)
        .then(function(data) {
            try {
                let outData = postData("/addWeatherUserData", data);
                return outData;
            } catch(error) {
                console.log(error);
            }
        })
        .then(function() {
            updateUI();
        });
}

const updateUI = async() => {
    const request = await fetch('/all');

    try {
        const weatherUserData = await request.json();
        const dateBox = document.getElementById("date");
        const cityBox = document.getElementById("city");
        const temperatureBox = document.getElementById("temp");
        const contentBox = document.getElementById("content");
        
        if (parseInt(weatherUserData[0].cod, 10) >= 400) {
            dateBox.innerHTML = "Date: " + weatherUserData[0].date;
            cityBox.innerHTML = "";
            temperatureBox.innerHTML = "No weather data retrieved from endpoint. Please make sure to provide a valid Zip Code (e.g. 10001,US)";;
            contentBox.innerHTML = "Feelings: " + weatherUserData[0].userFeelings;
        } else {
            dateBox.innerHTML = "Date: " + weatherUserData[0].date;
            cityBox.innerHTML = "City: " + weatherUserData[0].city;
            temperatureBox.innerHTML = "Temperature: " + weatherUserData[0].main.temp + "°C";
            contentBox.innerHTML = "Feelings: " + weatherUserData[0].userFeelings;
        }
    
    } catch(error) {
        console.log("Error: ", error);
    }
};

const getUserWeatherData = async (weatherApiUrl, weatherApiKey) => {

    const userZip = cleanZip(document.getElementById("zip").value);
    const userFeelings = document.getElementById("feelings").value;
    const urlExtension = `?zip=${userZip}&units=metric&appid=${weatherApiKey}`;
    const weatherFetchUrl = weatherApiUrl+urlExtension;

    const weatherResult = await fetch(weatherFetchUrl);

    try {
        const weatherData = await weatherResult.json();

        const outData = {
            cod: weatherData.cod,
            date: newDate,
            coord: weatherData.coord,
            weather: weatherData.weather,
            main: weatherData.main,
            visibility: weatherData.visibility,
            wind: weatherData.wind,
            sys: weatherData.sys,
            userZip: userZip,
            userFeelings: userFeelings,
            city: weatherData.name
        };

        console.log(outData);

        return outData;
    } catch(error) {
        console.log("Weather GET Error: ", error);
    }
}

const postData = async (url = "", data = {}) => {

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
        return newData;
    } catch(error) {
        console.log("Error: ", error);
    }
};

function cleanZip(zipCode) {
    if (zipCode.includes(",")) {
        zipCode = zipCode.replaceAll(/\s/g,'');
        return zipCode;
    } else {
        zipCode = zipCode + ',US';
        return zipCode;
    }
}