function displayTemperature(response){
  let temperatureElement = document.querySelector("#current-temperature")
  temperatureElement.innerHTML = Math.round(response.data.main.temp)
  let cityElement = document.querySelector("#city")
  cityElement.innerHTML = response.data.name
  let descriptionElement = document.querySelector("#description")
  descriptionElement.innerHTML = response.data.weather[0].description
  let humidityElement = document.querySelector("#humidity")
  humidityElement.innerHTML = response.data.main.humidity
  let windElement = document.querySelector("#wind")
  windElement.innerHTML = Math.round(response.data.wind.speed)
  console.log(response.data)
}

let apiKey = "05d59b97163becec12a0f8000856ca3e"
let city = "Lisbon"
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)