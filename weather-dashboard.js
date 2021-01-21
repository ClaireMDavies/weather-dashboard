
$(document).ready(function () {

    //Click handler to initiate the data call
    $("#search-button").click(function () {
        var cityName = $("#city-name").val();
        console.log(cityName);
        callWeatherApi(cityName);

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
            })
        })
    }
});

//displaying current weather  
function displayCurrentWeatherData(weatherData, cityName) {
    $("#cityHeader").html("<h2>" + cityName + " " + "</h2>");
    $("#temp").html("<h6> Temperature: " + weatherData.current.temp + "°C</h6>");
    $("#humid").html("<h6> Humidity: " + weatherData.current.humidity + "%</h6>");
    $("#windspeed").html("<h6> Wind Speed: " + weatherData.current.wind_speed + "MPH</h6>");
    $("#uv-index").html("<h6> UV Index: " + weatherData.current.uvi + "</h6>");
}

//display 5 day forecast
function displayFutureWeatherData(weatherData) {
    for (var i = 1; i <= 5; i++) {
        var futureWeather = weatherData.daily[i];
        var date = new Date(futureWeather.dt * 1000);
        date = date.toLocaleDateString();
        console.log(date);
        $("#date" + i).html("<h4>" + date + "</h4>");
        $("#temp" + i).html("<h6> Temp: " + futureWeather.temp.day + "°C</h6>");
        $("#humid" + i).html("<h6> humidity: " + futureWeather.humidity + "%</h6>");


    }



}



                        //$.each(weatherData.daily, function (index, val) {
                            //var UNIX_Timestamp = val.dt;
                            //var date = new Date(UNIX_Timestamp * 1000);
                            //

                            //

                        //})




                        //$("#icon")

                    //});
            //})
            //.fail(function () {
                //alert("failed");
            //});
    //}



