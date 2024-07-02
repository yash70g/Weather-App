const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="835c448350bb6de57333b5c5d10c1014"

weatherForm.addEventListener("submit", async event=>{

    event.preventDefault();
    const city=cityInput.value;
    if(city)
        
        try{
            const weatherData=await getWeatherData(city);
            getWeatherInfo(weatherData)
        }catch(error){
            console.error(error)
            displayError(error)
        }
        else{
            displayError("Please Enter a City")
        }
});

async function getWeatherData(city){
    const apirURL=`https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response=await fetch(apirURL);
    if (!response.ok) {
        throw new Error("Could not fetch data")
    }
    return await response.json();
}

function getWeatherInfo(data){
 const {name:city,
    main:{temp,humidity},
    weather:[{description,id}]} = data;
    card.textContent="";
    card.style.display="flex"
    const cityDisplay=document.createElement("h1")
    const tempDisplay=document.createElement("p")
    const humidityDisplay=document.createElement("p")
    const descDisplay=document.createElement("p")
    const weatherEmoji=document.createElement("p")
    cityDisplay.textContent=city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);
    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId) {
    // Remove all existing temperature classes
    card.classList.remove("temp-1", "temp-2", "temp-3", "temp-4", "temp-5", "temp-6", "temp-7");

    let emoji;
    let tempClass;

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            tempClass = "temp-1";
            emoji = "⛈️";
            break;
        case (weatherId >= 300 && weatherId < 400):
            tempClass = "temp-2";
            emoji = "🌧️";
            break;
        case (weatherId >= 500 && weatherId < 600):
            tempClass = "temp-3";
            emoji = "🌦️";
            break;
        case (weatherId >= 600 && weatherId < 700):
            tempClass = "temp-4";
            emoji = "🌨️";
            break;
        case (weatherId >= 700 && weatherId < 800):
            tempClass = "temp-5";
            emoji = "🌫️";
            break;
        case (weatherId === 800):
            tempClass = "temp-6";
            emoji = "☀️";
            break;
        case (weatherId >= 801 && weatherId < 810):
            tempClass = "temp-7";
            emoji = "☁️";
            break;
        default:
            tempClass = "temp-1"; // Default class
            emoji = "🐶";
    }

    card.classList.add(tempClass);
    return emoji;
}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}