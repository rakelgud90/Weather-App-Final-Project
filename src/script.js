function formatDate(timestamp){
  let date = new Date(timestamp)
  let hours = date.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = date.getMinutes()
   if (minutes < 10) {
    minutes = `0${minutes}`
  }
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dayOfWeek = daysOfWeek[date.getDay()]
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let month = months[date.getMonth()]
  let day = date.getDate()

  return `${dayOfWeek} ${month} ${day}, ${hours}:${minutes}`
}

function formatSunrise(timestamp) {
  let date = new Date(timestamp)
  let hours = date.getHours()
    if (hours < 10) {
      hours = `0${hours}`
    }
  let minutes = date.getMinutes()
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
  return `${hours}:${minutes}`
}

function formatSunset(timestamp) {
let date = new Date(timestamp)
let hours = date.getHours()
if (hours < 10) {
  hours = `0${hours}`
}
let minutes = date.getMinutes()
   if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return `${hours}:${minutes}`
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp)
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let dayOfWeek = daysOfWeek[date.getDay()]

  return `${dayOfWeek}`
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast")
  forecastElement.innerHTML = null
  let forecast = null

  for (let index = 0; index < 6; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += 
    `<div class="col-2">
      <p class="forecast-week-day">${formatForecastDay(forecast.dt * 1000)}</p>
      <img
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
      alt="${forecast.weather[0].description}"
      class="w-100">
      <p><strong>
      ${Math.round(forecast.temp.max)} ºC
      </strong> | 
      ${Math.round(forecast.temp.min)} ºC</p>
    </div>`;
   } 
  }


function displayData(response){
  celsiusTemperature = response.data.main.temp
  let temperatureElement = document.querySelector("#current-temperature")
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
  
  let cityElement = document.querySelector("#city")
  cityElement.innerHTML = response.data.name
  
  let descriptionElement = document.querySelector("#description")
  descriptionElement.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1)
  
  let humidityElement = document.querySelector("#humidity")
  humidityElement.innerHTML = response.data.main.humidity
  
  let windElement = document.querySelector("#wind")
  windElement.innerHTML = Math.round(response.data.wind.speed)
  
  let dateElement = document.querySelector("#date")
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
  
  let sunriseElement = document.querySelector("#sunrise")
  let sunsetElement = document.querySelector("#sunset")
  sunriseElement.innerHTML = formatSunrise(response.data.sys.sunrise * 1000)
  sunsetElement.innerHTML = formatSunset(response.data.sys.sunset * 1000)

  let iconElement = document.querySelector("#icon")
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  iconElement.setAttribute("alt", response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1))

  let lat = response.data.coord.lat
  let lon = response.data.coord.lon
  let apiKey = "05d59b97163becec12a0f8000856ca3e"


  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast)

}

function search(city) {
  let apiKey = "05d59b97163becec12a0f8000856ca3e"
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayData)
}

function handleSubmit(event) {
  event.preventDefault()
  let cityInputElement = document.querySelector("#city-input")
  search(cityInputElement.value)
}

function getCurrentDetails(position){
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiKey = "05d59b97163becec12a0f8000856ca3e"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayData)
}

function getCoordinates(){
  navigator.geolocation.getCurrentPosition(getCurrentDetails)
}

function showFahrenheitTemperature(event) {
  event.preventDefault()

  celsiusLink.classList.remove("active")
  fahrenheitLink.classList.add("active")

  let temperatureElement = document.querySelector("#current-temperature")
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32)
  temperatureElement.innerHTML = fahrenheitTemperature
}

function showCelsiusTemperature(event) {
  event.preventDefault()

  fahrenheitLink.classList.remove("active")
  celsiusLink.classList.add("active")

  let temperatureElement = document.querySelector("#current-temperature")
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
}

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

let currentLocButton = document.querySelector(".current-loc-btn")
currentLocButton.addEventListener("click", getCoordinates)

let celsiusTemperature = null

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", showFahrenheitTemperature)

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", showCelsiusTemperature)

search("Lisbon")
