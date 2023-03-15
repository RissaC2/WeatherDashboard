const apiKey = "b71c3e19d22190945e47347c36e4e5aa";
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const currentWeatherEl = document.querySelector ("#today")

getCoordinates = function () {
  var userInput = searchInput.value;
  console.log(userInput);
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${apiKey}`
  )
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      console.log(data);
      var lat=data[0].lat
      var lon=data[0].lon
      getWeather(lat,lon)
    });
};

getWeather = function (lat, lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      console.log("weather:", data);
      renderWeather (data)
    
    });
};

renderWeather = function(data) {
  var cityName = document.createElement ("h2") 
cityName.textContent= data.city.name 
console.log(data.city.name)
currentWeatherEl.append(cityName)
var cityTemp = document.createElement ("h3")

}


searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  getCoordinates();
});

// // create variables to get back tempterture etc 
// create a for loop to append date etc to each card/container




