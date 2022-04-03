var citySearch = document.querySelector("form");
var submitBtn = document.querySelector("#input-city-btn");
var cityInputEl = document.querySelector("#city-input");

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

fetch('https://api.openweathermap.org/data/2.5/solar_radiation?lat=28.5383&lon=-81.3792&appid=709cd6f20260c1a83a27ae8068f9a762')
.then(function(data) {
  data.json();
  console.log(data);
});