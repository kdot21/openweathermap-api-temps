//Global Variables
var OPEN_WEATHER_MAP_API = "http://api.openweathermap.org/data/2.5/weather?APPID=aeb9dd1ef482882f1cc24ba2ba2cedc5&q=";
var resultElement = $("#result");

function callOpenWeatherMap(city) {

    if (city.length == 0) {
      $("#result").html("Please enter a city name into the search field");
    } else {

        $.get(OPEN_WEATHER_MAP_API + city, function(searchResult) {
           // convert Kelvin temperature to Celsius
           var celsiusTemp = toCelsius(searchResult.main.temp);

          //STUDENT CODE STARTS HERE            
          var source = $('.weather-result-template').html();
          
          var template = Handlebars.compile(source);
          
          var weatherTemplateData = {
            city: searchResult.name,
            temp: celsiusTemp
          };
            
          var weatherResultHTML = template(weatherTemplateData);
            
          resultElement.html(weatherResultHTML);
        });

    }

}

function toCelsius(kelvinTemp) {
  var temp = Math.round(kelvinTemp - 273.15);
  return temp;
}

$("#searchBtn").on('click', function (event){
    event.preventDefault(); 

    callOpenWeatherMap($("#searchField").val());
});