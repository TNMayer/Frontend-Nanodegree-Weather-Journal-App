/* Global Variables */
let weatherApiKey = "f7bfc3234b1cee0b3c125998...";
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + ((d.getMonth()+1)<10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1)) + '.' + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(event) {
    event.preventDefault();

    getUserWeather(weatherApiUrl, weatherApiKey)
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
        const temperatureBox = document.getElementById("temp");
        const contentBox = document.getElementById("content");
        
        if (weatherUserData[0].cod === "400") {
            dateBox.innerHTML = weatherUserData[0].date;
            temperatureBox.innerHTML = "No weather data retrieved from endpoint <br> Please make sure to provide a valid Zip Code (e.g. 10001,US)";;
            contentBox.innerHTML = weatherUserData[0].userFeelings;
        } else {
            dateBox.innerHTML = weatherUserData[0].date;
            temperatureBox.innerHTML = weatherUserData[0].main.temp + "°C";
            contentBox.innerHTML = weatherUserData[0].userFeelings;
        }
    
    } catch(error) {
        console.log("Error: ", error);
    }
};

const getUserWeather = async (weatherApiUrl, weatherApiKey) => {

    const userZip = document.getElementById("zip").value;
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
            userFeelings: userFeelings
        };

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
        return newData
    } catch(error) {
        console.log("Error: ", error);
    }
};
