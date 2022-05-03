// variables
let body = document.querySelector('body');
let theDate = document.querySelector('#date');
let theDay = document.querySelector('#day');
let theHour = document.querySelector('#hour');
let searchInput = document.querySelector('#search');
let city = document.querySelector('.city');
let temprature = document.querySelector('#temprature');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let weatherCondition = document.querySelector('#status');
let headerTitle = document.querySelector('#title');
let current = document.querySelector('#current')
let modeSwitch = document.querySelector('#switch');
let icon = document.querySelector('#icon');
let farenhietDegree = document.querySelector('#farenhiet');
let celsiusDegree = document.querySelector('#celsius');
let celsiusTemprature = null;
let now = new Date();



// eventlisteners
eventlisteners()
function eventlisteners() {

    // submit the form 
    form.addEventListener('submit', changeInfo);


    //DOM loaded
    document.addEventListener('DOMContentLoaded', getCurrentDate);


    // get current location details
    current.addEventListener('click', showPosition)


    // change celsius to farenhiet
    farenhietDegree.addEventListener('click', displayFarenhietTemprature);


    // change farenhiet to celsius 
    celsiusDegree.addEventListener('click', displayCelsiusTemprature)
}



// display forecast
function displayForecast(){
    let forecast = document.querySelector('#weather-forecast');
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'fri'];

    // create the row for show the forecast
    let forecastHtml = `<div class="row">`;
    days.forEach(function(day) {
        
        forecastHtml= forecastHtml +
         `
         <div class="col-sm-6 col-md-6 mt-3">
             <div class="d-flex justify-content-between align-items-center forecast__info">
                 <div class=""><img src="./assets/img/s.png" width="40" height="40"></div>
                 <div>
                     <ul class="">
                         <li>${day}</li>
                         <li>Rain</li>
                     </ul>
                 </div>
                 <div
                     class="forecast__info--temp d-flex align-items-center justify-content-center mr-0">
                     <span>25°</span>
                     <span>/</span>
                     <span>35°</span>
                 </div>
             </div>
         </div>
         `
    });

    forecastHtml = forecastHtml + `</div>`

    // put the forecasthtml content in the forecast html
    forecast.innerHTML  =  forecastHtml;
}

// convert celsius to farenheit
function displayFarenhietTemprature(event) {

    event.preventDefault();
    let farenhietTemprature = (celsiusTemprature * 9 / 5) + 32;
    // tempratureFirst.innerHTML = Math.round(farenhietTemprature);
    temprature.innerHTML = Math.round(farenhietTemprature);


    // remove the active class
    celsiusDegree.classList.remove('active');
    farenhietDegree.classList.add('active');
}


// convert farenheit to celsius
function displayCelsiusTemprature(event){

    event.preventDefault();
    temprature.innerHTML = Math.round(celsiusTemprature);

    // add the active class
    celsiusDegree.classList.add('active');
    farenhietDegree.classList.remove('active')

}


// change info after click on search icon
function changeInfo(event) {

    event.preventDefault();

    // get the value of city
    city.innerHTML = searchInput.value;

    let location = city.innerHTML;


    // api key
    let key = "9d49cb1787297e12afd385e4fcc226c8";

    // api url
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`

    // axios request
    axios.get(apiUrl).then(getLocationInfo);

}


// get the location details
function getLocationInfo(response) {
    console.log(response);

    // get the city name 
    city.innerHTML = response.data.name;
    headerTitle.innerHTML = city.innerHTML


    // celsius temprature
    celsiusTemprature = response.data.main.temp

    // temprature
    temprature.innerHTML = Math.round(celsiusTemprature);
    // tempratureSecond.innerHTML = Math.round(response.data.main.temp);

    // humidity
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`

    // wind
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

    //status
    weatherCondition.innerHTML = `${response.data.weather[0].description}`

    // set icon
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute('alt', response.data.weather[0].description);

}


// get current date
function getCurrentDate(latestDate) {

    // days
    let days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDENSDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ]

    // months
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ]


    let day = days[latestDate.getDay()];
    let month = months[latestDate.getMonth()];
    let date = latestDate.getDate();
    let year = latestDate.getFullYear();
    let hours = latestDate.getHours();
    let minutes = latestDate.getMinutes()

    if (hours < 10) {
        hours = `0${hours}`
    }

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    // today date
    theDate.innerHTML = `${month} ${date}TH`;

    // day
    theDay.innerHTML = `${day}`;

    // hour
    theHour.innerHTML = `${hours}:${minutes}`

}
getCurrentDate(now);



// search the current city by geolocation
function searchCity(city) {
    let key = "9d49cb1787297e12afd385e4fcc226c8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(getLocationInfo);
}


// search the location
function searchLocation(position) {

    let key = "9d49cb1787297e12afd385e4fcc226c8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
      }&lon=${position.coords.longitude}&appid=${key}&units=metric`;

    axios.get(apiUrl).then(getLocationInfo)
}
navigator.geolocation.getCurrentPosition(showPosition)


// show now position
function showPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation)
}


// put tehran of default 
searchCity('Tehran')


// diaplay the forecast
displayForecast()