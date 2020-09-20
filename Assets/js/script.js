$(document).ready(function () {
  updateListOfCitiesUi();
});

function getSetCityFromLocalStorage(city) {
  var citiesLocal = JSON.parse(localStorage.getItem("citiesserched"));
  if (!citiesLocal) {
    var citiesA = [];
    if (city) {
      citiesA.push(city);
      var a = {};
      a.cities = citiesA;
      localStorage.setItem("citiesserched", JSON.stringify(a));
      updateListOfCitiesUi();
    }
  } else {
    if (city) {
      if (!citiesLocal.cities.indexOf(city)) {
        citiesLocal.cities.push(city);
      }
      var b = citiesLocal.cities;
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
      console.log(response);
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;
      getSetCityFromLocalStorage(inputValue);
      updateWeatherUi(response);
    });
    //   var queryUrl2 = "http://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+lon+"exclude=hourly,minutely&appid=7118d3eda51d9d8e760f326175a3947b"
    //     $.ajax({

    //     }).then(function(response2){
    //         console.log(response2);
    //     });
  }
  //   getCityFromLocalStorage(city);
});

function updateListOfCitiesUi() {
  var citiesLocal = JSON.parse(localStorage.getItem("citiesserched"));
  if (citiesLocal) {
    var citiesProp = citiesLocal.cities;
    for (var i = 0; i < citiesProp.length; i++) {
      var pEl = $("<p class='cities border mt-0 mb-0 p-2'>").text(citiesProp[i]);
      $("#listOfCitiesSearched").append(pEl);
    }
  }
}

function updateWeatherUi(wInput) {
  console.log(wInput);
}
// click event handler that responds on user click on the list of cities. When one of the city
//  is click the weather information for that city will be displayed.
$("#listOfCitiesSearched").on("click", $(".cities"), function () {
  var inputValue = $(this).text();
  var queryUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    inputValue +
    "&cnt=1&appid=7118d3eda51d9d8e760f326175a3947b";
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    updateWeatherUi(response);
  });
});
