$(document).ready(function () {
  updateListOfCitiesUi();
  initWeather();
});

function getSetCityFromLocalStorage(city) {
  var citiesLocal = JSON.parse(localStorage.getItem("citiesserched"));
  if (!citiesLocal) {
    var citiesA = [];
    if (city) {
      city = city.toUpperCase();
      citiesA.push(city);
      var a = {};
      a.cities = citiesA;
      localStorage.setItem("citiesserched", JSON.stringify(a));
      updateListOfCitiesUi();
    }
  } else {
    if (city) {
      city = city.toUpperCase();
      if (citiesLocal.cities.indexOf(city) === -1) {
        citiesLocal.cities.push(city);
      }

      localStorage.setItem("citiesserched", JSON.stringify(citiesLocal));
    }

    updateListOfCitiesUi();
  }
}

$("#search").on("click", function () {
  var inputValue = $("#searchTerm").val();
  var lat, lon;
  if (inputValue) {
    var queryUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      inputValue +
      "&cnt=1&appid=7118d3eda51d9d8e760f326175a3947b";
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;
      var queryUrl2 =
        "http://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=hourly,minutely&appid=7118d3eda51d9d8e760f326175a3947b";
      $.ajax({
        url: queryUrl2,
        method: "GET",
      }).then(function (response2) {
        getSetCityFromLocalStorage(inputValue);
        updateWeatherUi(response2, inputValue);
      });
    });
  }
});

function updateListOfCitiesUi() {
  var citiesLocal = JSON.parse(localStorage.getItem("citiesserched"));
  if (citiesLocal) {
    $("#listOfCitiesSearched").empty();
    var citiesProp = citiesLocal.cities;
    for (var i = 0; i < citiesProp.length; i++) {
      var pEl = $("<p class='cities border mt-0 mb-0 p-2'>").text(
        citiesProp[i]
      );
      $("#listOfCitiesSearched").append(pEl);
    }
  }
}

function updateWeatherUi(wInput, inputValue) {
  $("#0").empty();
  $("#1").empty();
  $("#2").empty();
  $("#3").empty();
  $("#4").empty();
  $("#5").empty();
  var h5El = $("<h5>");
  h5El.text(inputValue.toUpperCase() + " (" + moment().format("l") + ")");
  var iconurl =
    "http://openweathermap.org/img/w/" +
    wInput.current.weather[0].icon +
    ".png";
  var imgEl = $("<img>");
  imgEl.attr("src", iconurl);
  h5El.append(imgEl);
  $("#0").append(h5El);
  var pEl = $("<p>");
  pEl.text("Temperature: " + wInput.current.temp + "K");
  $("#0").append(pEl);
  var pEl = $("<p>");
  pEl.text("Humidity: " + wInput.current.humidity + "%");
  $("#0").append(pEl);
  pEl = $("<p>");
  pEl.text("Wind Speed: " + wInput.current.wind_speed + " MPH");
  $("#0").append(pEl);
  pEl = $("<p>");
  pEl.text("UV Index: ");
  spanEl = $("<span class='bg-danger text-white p-1'>");
  spanEl.text(wInput.current.uvi);
  pEl.append(spanEl);
  $("#0").append(pEl);
  for (var i = 1; i < 6; i++) {
    var pEl = $("<p>");
    var day = moment().add(i, "days").calendar("l");
    pEl.text(day);
    var divId = "#" + i;
    $(divId).append(pEl);
    var iconurl =
      "http://openweathermap.org/img/w/" +
      wInput.daily[i].weather[0].icon +
      ".png";
    var imgEl = $("<img>");
    imgEl.attr("src", iconurl);
    var pEl2 = $("<p>");
    pEl2.text("Temp: " + wInput.daily[i].temp.day);
    var pEl3 = $("<p>");
    pEl3.text("Humidity: " + wInput.daily[i].humidity + "%");
    $(divId).append(imgEl, pEl2, pEl3);
  }
}

// click event handler that responds on user click on the list of cities. When one of the city
//  is click the weather information for that city will be displayed.
$("#listOfCitiesSearched").on("click", ".cities", function () {
  var inputValue = $(this).text();
  ajaxCall(inputValue);
});
function initWeather() {
  var citiesLocal = JSON.parse(localStorage.getItem("citiesserched"));
  var cityName = citiesLocal.cities[citiesLocal.cities.length - 1];
  ajaxCall(cityName);
}

function ajaxCall(cityInput) {
  var lat, lon;
  if (cityInput) {
    var queryUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      cityInput +
      "&cnt=1&appid=7118d3eda51d9d8e760f326175a3947b";
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;
      var queryUrl2 =
        "http://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=hourly,minutely&appid=7118d3eda51d9d8e760f326175a3947b";
      $.ajax({
        url: queryUrl2,
        method: "GET",
      }).then(function (response2) {
        updateWeatherUi(response2, cityInput);
      });
    });
  }
}
