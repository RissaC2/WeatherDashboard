const apiKey = "b71c3e19d22190945e47347c36e4e5aa";
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const currentWeatherEl = document.querySelector("#today");

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
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
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
      renderWeather(data);
    });
};

renderWeather = function (data) {
  var cityName = document.createElement("h2");
  cityName.textContent = data.city.name;
  console.log(data.city.name);
  currentWeatherEl.append(cityName);
  var cityTemp = document.createElement("h3");
};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  getCoordinates();
});

createWeatherCards = function (data) {
  var forecastEl = document.querySelector("#forecast");
  forecastEl.innerHTML = "";
  for (var i = 0; i < 5; i++) {
    var cardEl = document.createElement("div");
    cardEl.classList.add("col-md-3", "mb-3");

    var cardBodyEl = document.createElement("div");
    cardBodyEl.classList.add("card", "h-100");

    var cardHeaderEl = document.createElement("div");
    cardHeaderEl.classList.add("card-header", "bg-primary", "text-white");

    var date = moment(data.list[i].dt_txt).format("dddd, MMMM Do");
    cardHeaderEl.textContent = date;

    var cardBodyContent = `
      <p class="card-text">
        <img src="http://openweathermap.org/img/wn/${
          data.list[i].weather[0].icon
        }.png" alt="${data.list[i].weather[0].description}" />
      </p>
      <p class="card-text">Temp: ${Math.round(
        data.list[i].main.temp
      )} &deg;F</p>
      <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
    `;

    cardBodyEl.innerHTML = cardBodyContent;

    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);

    forecastEl.appendChild(cardEl);
  }
};

renderWeather = function (data) {
  var cityName = document.createElement("h2");
  cityName.textContent = data.city.name;
  console.log(data.city.name);
  currentWeatherEl.append(cityName);

  var cityTemp = document.createElement("h3");
  cityTemp.textContent =
    "Temperature: " + Math.round(data.list[0].main.temp) + " \xB0F";
  currentWeatherEl.append(cityTemp);

  createWeatherCards(data);
};
