//worked with Sarah Lund on homework :)

$(document).ready(function() {
console.log('main.js is connected!');

/*

Here's an overview of the steps you'll follow to get your app to work...

STEPS

1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/

var cityName;
var currentTemp;
var description;
var minTemp;
var maxTemp;
// var icon;

  var callApi = function(event) {
    event.preventDefault();
    // console.log('inside callApi')
    // the callApi function makes the ajax call to get the data
    let zip = $('#input').val();
    console.log(zip);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${zip},us&units=imperial&appid=0fc87027b19a680898624a73494f93bc`
    $.getJSON(url)
      .done(function(data) {
        // console.log('data came back', data);
        // debugger
        cityName = data.name;
        currentTemp = data.main.temp;
        description = data.weather[0].description;
        minTemp = data.main.temp_min;
        maxTemp = data.main.temp_max;
        // icon = data.weather[0].icon;

        //these already exist in the html you just need to populate and grab them
        manipulateDom(cityName,currentTemp,description,minTemp,maxTemp);
      })
      .fail(function(data) {
        console.log('failed getting weather');
      })
  }

  // change the inner html of divs with appropriate data
  var manipulateDom = function(cityName,currentTemp,description,minTemp,maxTemp){
    $('#city').html(cityName)
    $('#currentTemp').html(currentTemp)
    changeColor()
    $('#description').html(description)
    $('#minTemp').html(minTemp)
    $('#maxTemp').html(maxTemp)
    // $('#rainbow').html(icon)

  }

  let submitButton = document.querySelector('#zipButton');
  //add event listener to the submit button and call Api function
  submitButton.addEventListener('click', callApi);

  // change color based on temperature
  function changeColor() {
    if (currentTemp < 40) {
      $('#currentTemp').css('color', 'blue')
    } else if (currentTemp > 90) {
      $('#currentTemp').css('color', 'red')
    }
    }
  })

