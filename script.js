// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";
let additionText = document.getElementById('addition-Text')

// object for units
let unitObj = {
  metric: ' C',
  imperial: 'F'
}

// https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial

getWeatherData = async (city, unit) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const fullURL = `${URL}?q=${city}&appid=${API_KEY}&units=${unit}`;

  const response = await fetch(fullURL);
  const weatherData = await response.json();
  return weatherData;
}


searchCity = (unit) => {
  const city = document.getElementById('city-input').value;

  getWeatherData(city, unit)
    .then((res) => {
      showWeatherData(res, unit)
    }).catch((error) => {
      console.log('Error while fetching weather data: '+ error)
    })
}

showWeatherData = (weatherData, unit) => {
  const { main, name, weather } = weatherData
  const iconLink = `https://openweathermap.org/img/w/${weather[0].icon}.png`
  document.getElementById('city-name').innerText = name
  document.getElementById('weather-type').innerText = weather[0].description
  document.getElementById('temp').innerText = main.temp + unitObj[unit]
  document.getElementById('min-temp').innerText = main.temp_min + unitObj[unit]
  document.getElementById('max-temp').innerText = main.temp_max + unitObj[unit]
  document.getElementById('weather-icon').src = iconLink

  if(unit === 'metric'){
    document.getElementById('addition-Text').innerText = 'Looking for Temperature in Fahrenheit'
  }else{
    document.getElementById('addition-Text').innerText = 'Looking for Temperature in Celsius'
  }


}

