
$(document).ready(function () {

    //Click handler to initiate the data call
    $("#search-button").click(function () {
        var cityName = $("#city-name").val();
        console.log(cityName);
        callWeatherApi(cityName);

    });
    //initiate API call on enter being pressed
    $("#city-name").keyup(function(event){
        if(event.keyCode == 13){
            $("#city-name").click();
            var cityName = $("#city-name").val();
            console.log(cityName);
            callWeatherApi(cityName);
        }
    });


    //API call 
    function callWeatherApi(cityName) {
        var domain = "https://api.openweathermap.org/data/2.5/"
        var endpoint = "weather"
        var endpoint2 = "onecall"
        var APIkey = "34968e1c8cc5a5188ec7e46c656b4dc8"
        var urlCity = `${domain + endpoint}?q=${cityName}&appid=${APIkey}`

        $.ajax({
            url: urlCity,
            method: "GET"
        })
        .done(function (response) {
            var locationData = response;
            var lat = locationData.coord.lat;
            var long = locationData.coord.lon;
            var url = `${domain + endpoint2}?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
            console.log(locationData);

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
            })
        })
    }
});

//displaying current weather  
function displayCurrentWeatherData(weatherData, cityName) {
    var todaysDate = new Date(weatherData.current.dt *1000);
    todaysDate = todaysDate.toLocaleDateString();
    $("#icon").attr("src", `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`);

    $("#city-header").html(cityName + " " + todaysDate);
    $("#temp").html("Temperature: " + weatherData.current.temp + "°C");
    $("#humid").html("Humidity: " + weatherData.current.humidity + "%");
    $("#windspeed").html("Wind Speed: " + weatherData.current.wind_speed + "MPH");
    $("#uv-index").html("UV Index: " + weatherData.current.uvi);
    
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

function ivDisplay(weatherData) {
    var uvLevel = weatherData.current.uvi;
    if (uvLevel >= 3) {
        $("#uv-index").css("background-color", "yellow");
        
    }

    if (uvLevel >= 8) {
            $("#uv-index").css("background-color", "red");
    }

    else {
        $("#uv-index").css("background-color", "green");
    }
}



                       




                        
            //.fail(function () {
                //alert("failed");
            //});
    



