var citySearch = document.querySelector("form");
var submitBtn = document.querySelector("#input-city-btn");
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-input");
var fiveDayEl = document.getElementById("five-day-forecast");
var city = "";


const quickSearches = ["", "", "", "", "", "", "", ""];

for (let i = 0; i < 8; i++) {
  var secondaryBtn = document.createElement("button");

  secondaryBtn.classList.add("btn-secondary");
  secondaryBtn.classList.add("btn");
  secondaryBtn.innerHTML = "city";
  // secondaryBtn.setAttribute("type", "button");
  // secondaryBtn.setAttribute("value", "");
  citySearch.append(secondaryBtn);
  // console.log(secondaryBtn);
}

// for (let i = 1; i < 6; i++) {
//   var forecastCardEl = document.createElement("div");
//   forecastCardEl.setAttribute("id", "forecast-card-" + i);


// }


var formSubmitHandler = function(e) {
  e.preventDefault();
  console.log(e);
  getCoordinateData();
  getWeatherData(lat, long);
}




var getWeatherData = function (lat, long) {
  // console.log(lat);
  // console.log(long);

  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=709cd6f20260c1a83a27ae8068f9a762")
  .then(function(response) {
    response.json().then(function(response) {
      console.log(response);
      displayCurrentWeather(response);
      setForecastData(response);
    });
  });
}

var setForecastData = function (weatherData) {
  console.log(weatherData);
  for (let i = 1; i < 6; i++) {
    // let forecastCard = $("#forecast-day-" + i);
    // console.log(forecastCard);
    var forecastDate = moment().add((i).toString(), "days").format("MM/DD/YYYY");
    $("#forecast-day-" + i).find(".forecast-card-date").text(forecastDate);
    $("#forecast-day-" + i).find(".forecast-temp").text(("Temp: " + weatherData.daily[i - 1].temp.day + "°F"));
    $("#forecast-day-" + i).find(".forecast-wind").text("Wind: " + (weatherData.daily[i - 1].wind_speed + " MPH"));
    $("#forecast-day-" + i).find(".forecast-humidity").text("Humidity " + (weatherData.daily[i - 1].humidity + " %"));
  }
}

var displayCurrentWeather = function (weatherData) {
  // console.log(weatherData);
  let currentTempEl = document.getElementById("todays-temp");
  let currentWindEl = document.getElementById("todays-wind");
  console.log(currentWindEl);
  let currentHumidityEl = document.getElementById("todays-humidity");
  let currentUVIndexEl = document.getElementById("todays-uv-index");
  currentTempEl.innerHTML = weatherData.current.temp + "°F";
  currentWindEl.innerHTML = weatherData.current.wind_speed;
  currentHumidityEl.innerHTML = weatherData.current.humidity + " %";
  currentUVIndexEl.innerHTML = weatherData.current.uvi;
}



var getCoordinateData = function() {
  city = cityInputEl.value.trim();
  var date = moment().format("MM/DD/YYYY");

  var coordinateApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=709cd6f20260c1a83a27ae8068f9a762";

  $("#todays-city").text(city + ' (' + date + ')');
  console.log($("#todays-city").text());
  

  fetch(coordinateApiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data[0]);
        lat = data[0].lat;
        long = data[0].lon;
      });
    } else {
      console.log("api request error");
    }

  });
};

// coordinate data for Onecall API
var lat = 0;
var long = 0;

searchFormEl.addEventListener("submit", formSubmitHandler);