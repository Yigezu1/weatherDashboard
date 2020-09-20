$(document).ready(function () {
  getCityFromLocalStorage();
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
  for (var i = 0; i < b.length; i++) {
    var pEl = $("<p class='cities'>").text(b[i]);
    $("#listOfCitiesSearched").append(pEl);
  }
}
