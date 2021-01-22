
$(document).ready(function () {
    
    loadPreviousSearches();

    //Click handler to initiate the data call
    $("#search-button").click(function () {
        var cityName = $("#city-name").val();
        console.log(cityName);
        callWeatherApiForCityName(cityName);
    });

    //initiate API call on enter being pressed
    $("#city-name").keyup(function(event) {
        if(event.keyCode == 13){
            $("#city-name").click();
            var cityName = $("#city-name").val();
            console.log(cityName);
            callWeatherApiForCityName(cityName);
        }
    });
    //clear the local storage and displayed list
    $("#clear").click(function(){
        localStorage.clear();
        $("ul").empty();
        $("#city-name").val("");

    });
});

var baseURL = "https://api.openweathermap.org/data/2.5/"
var APIkey = "34968e1c8cc5a5188ec7e46c656b4dc8"

//API call to take user input and find latitude and longitude data
function callWeatherApiForCityName(cityName) {
      
    var urlCity = `${baseURL}weather?q=${cityName}&appid=${APIkey}`

    $.ajax({
        url: urlCity,
        method: "GET"
    })
    .done(function (response) {
        var locationData = response;
        var lat = locationData.coord.lat;
        var lon = locationData.coord.lon;

        callWeatherApiForCoords(lat, lon, locationData);
    });
}

function callWeatherApiForCoords(lat, lon, locationData) {

    var url = `${baseURL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
              
    console.log(locationData);

    //API call to get the required data from onecall API
    $.ajax({

        url: url,
        method: "GET"

    })
    .done(function (weatherData) {
        console.log(weatherData);
        //using returned name in location data to ensure correct capitalisation
        displayCurrentWeatherData(weatherData, locationData.name);
        displayFutureWeatherData(weatherData);
        ivDisplay(weatherData);
        addCityToList(locationData);
    });
}

//display current weather  
function displayCurrentWeatherData(weatherData, cityName) {
    var todaysDate = new Date(weatherData.current.dt *1000);
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
        $("#icon" +i).attr("src", `http://openweathermap.org/img/wn/${futureWeather.weather[0].icon}.png`);
    }
}

// determine background colour for IV index
function ivDisplay(weatherData) {
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

function existingCityClick() {
     var cityName = $(this).text();
     callWeatherApiForCityName(cityName);
}


function addCityToList(locationData) {
    
    var cityName = locationData.name;

    var existingCoordinates = localStorage.getItem(cityName);

    if (existingCoordinates == null)
    {
        // city doesn't exist in local storage

        $("#city-list").prepend('<li><button id=' + cityName + '-button>' + cityName +'</button></li>');
        $("#" + cityName + "-button").click(existingCityClick);
        localStorage.setItem(cityName, locationData.coord.lat + ":" + locationData.coord.lon);
    }
    //else
    //{
        //var coords = existingCoordinates.split(":");        
        //var lat = coords[0];
        //var lon = coords[1];
    //}
}

function loadPreviousSearches() {
    
    for (var i=0; i < localStorage.length; ++i ) 
    {
        var cityName = localStorage.key(i);

        $("#city-list").prepend('<li><button id=' + cityName + '-button>' + cityName +'</button></li>');
        $("#" + cityName + "-button").click(existingCityClick);
    }    
}





                        
            //.fail(function () {
                //alert("failed");
            //});
    



