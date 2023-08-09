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
  document.getElementById('temp').innerText = main.temp
  document.getElementById('min-temp').innerText = main.temp_min
  document.getElementById('max-temp').innerText = main.temp_max
  document.getElementById('weather-icon').src = iconLink
  document.getElementById('addition-Text').innerText = 'Looking for Temperature in Fahrenheit'


}

let fetchData = document.getElementById('fetchMore')

fetchData.addEventListener('click', async () => {
  try {
    if (fetchData.innerText === 'Fahrenheit') {
      await searchCity('metric');
      fetchData.innerText = 'Celsius';
      document.getElementById('addition-Text').innerText = 'Looking for Temperature in Celsius';
    } else {
      await searchCity('imperial');
      fetchData.innerText = 'Fahrenheit';
      document.getElementById('addition-Text').innerText = 'Looking for Temperature in Fahrenheit';
    }
  } catch (error) {
    console.log(error);
  }
});


/*fetchData.addEventListener('click', async () => {
  try {
    if (fetchData.innerText === 'Fahrenheit') {
      await searchCity('metric');
      await updateText('Looking for Temperature in Celsius');
      await updateFetchDataText('Celsius');
    } else {
      await searchCity('imperial');
      await updateText('Looking for Temperature in Fahrenheit');
      await updateFetchDataText('Fahrenheit');
    }
  } catch (error) {
    console.log(error);
  }
}); */
