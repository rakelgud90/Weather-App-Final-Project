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

function displayTemperature(response){
  let temperatureElement = document.querySelector("#current-temperature")
  temperatureElement.innerHTML = Math.round(response.data.main.temp)
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
  let iconElement = document.querySelector("#icon")
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  iconElement.setAttribute("alt", response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1))
}

function search(city) {
  let apiKey = "05d59b97163becec12a0f8000856ca3e"
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayTemperature)
}

function handleSubmit(event) {
  event.preventDefault()
  let cityInputElement = document.querySelector("#city-input")
  search(cityInputElement.value)
}

search("Lisbon")

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)