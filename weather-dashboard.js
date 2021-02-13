
$(document).ready(function () {

    loadPreviousSearches();

    // get weather data for the last city we searched for
    var lastCitySearched = localStorage.getItem("last-city-searched");

    if (lastCitySearched !== null) {
        callWeatherApiForCityName(lastCitySearched);
    }

    //Click handler to initiate the data call
    $("#search-button").click(function () {
        var cityName = $("#city-name").val();
        console.log(cityName);
        searchButtonClick(cityName);
    });

    //initiate API call on enter being pressed
    $("#city-name").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#search-button").click();
        }
    });

    //clear the local storage and displayed list
    $("#clear").click(function () {
        localStorage.clear();
        $("ul").empty();
        $("#city-name").val("");
    });
});

function searchButtonClick(cityName) {
    callWeatherApiForCityName(cityName);
}

function existingCityClick() {
    var cityName = $(this).text();
    callWeatherApiForCityName(cityName);
}

//global variables for both API calls to make use of
var baseURL = "https://api.openweathermap.org/data/2.5/"
var APIkey = "34968e1c8cc5a5188ec7e46c656b4dc8"

//API call to take user input and find latitude and longitude data
function callWeatherApiForCityName(cityName) {

    var urlCity = `${baseURL}weather?q=${cityName}&appid=${APIkey}`

    $.ajax
        ({
            url: urlCity,
            method: "GET"
        })
        .done(function (response) {
            var locationData = response;
            callWeatherApiForCoords(locationData);
        })
        .fail(function () {
            alert("request failed");
        });
}

function callWeatherApiForCoords(locationData) {

    var url = `${baseURL}onecall?lat=${locationData.coord.lat}&lon=${locationData.coord.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`

    console.log(locationData);

    //API call to get the required data from onecall API
    $.ajax
        ({

            url: url,
            method: "GET"

        })
        .done(function (weatherData) {
            console.log(weatherData);

            //using returned name in location data to ensure correct capitalisation
            displayCurrentWeatherData(weatherData, locationData.name);
            displayFutureWeatherData(weatherData);
            displayUVI(weatherData);

            // will only add if not already in our list
            addCityToList(locationData.name);

            localStorage.setItem("last-city-searched", locationData.name);
        })
        .fail(function () {
            alert("request failed");
        });
}

//display current weather  
function displayCurrentWeatherData(weatherData, cityName) {
    var todaysDate = new Date(weatherData.current.dt * 1000);
    todaysDate = todaysDate.toLocaleDateString();
    $("#icon").attr("src", `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`);
    $("#city-header").html(cityName + " " + todaysDate);
    $("#temp").html("Temperature: " + weatherData.current.temp + "°C");
    $("#humid").html("Humidity: " + weatherData.current.humidity + "%");
    $("#windspeed").html("Wind Speed: " + weatherData.current.wind_speed + "MPH");
    $("#uv-index").html(" " + weatherData.current.uvi);
}

//display 5 day forecast (discarding first array index to save duplication)
function displayFutureWeatherData(weatherData) {
    for (var i = 1; i <= 5; i++) {
        var futureWeather = weatherData.daily[i];
        var date = new Date(futureWeather.dt * 1000);
        date = date.toLocaleDateString();

        console.log(date);
        $("#date" + i).html(date);
        $("#temp" + i).html("Temp: " + futureWeather.temp.day + "°C");
        $("#humid" + i).html("Humidity: " + futureWeather.humidity + "%");
        $("#icon" + i).attr("src", `http://openweathermap.org/img/wn/${futureWeather.weather[0].icon}.png`);
    }
}

// determine background colour for IV index
function displayUVI(weatherData) {
    var uvLevel = weatherData.current.uvi;
    if (uvLevel <= 3) {
        $("#uv-index").css("background-color", "green");
        $("#uv-index").css("color", "white");
    }

    else if (uvLevel >= 8) {
        $("#uv-index").css("background-color", "red");
        $("#uv-index").css("color", "white");
    }

    else {
        $("#uv-index").css("background-color", "yellow");
        $("#uv-index").css("color", "black");
    }
}
//add city names to local storage
function addCityToList(cityName) {
    var existingCities = localStorage.getItem("cities");

    if (existingCities !== null) {
        // we already have some cities stored in local storage
        var cityArray = JSON.parse(existingCities);

        // if city not already in array
        if (cityArray.indexOf(cityName) < 0) {
            cityArray.unshift(cityName);
            localStorage.setItem("cities", JSON.stringify(cityArray));

            createListButtons(cityName);
        }
    }
    else {
        // this will be the first city we store
        var cityArray = [cityName];
        localStorage.setItem("cities", JSON.stringify(cityArray));

        createListButtons(cityName);
    }
}

//take cities from local storage and display
function loadPreviousSearches() {
    var existingCities = localStorage.getItem("cities");

    if (existingCities !== null) {
        var cityArray = JSON.parse(existingCities);
        $.each(cityArray, function (index, cityName) {
            createListButtons(cityName);
        });
    }
}

//create buttons for search history list
function createListButtons(cityName) {
    $("#city-list").prepend('<li><button id=' + cityName + '-button class="list-button">' + cityName + '</button></li>');
    $("#" + cityName + "-button").click(existingCityClick);
}







