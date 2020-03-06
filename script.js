
  const objToday = new Date(),
  weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = function() { let a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
  dayOfMonth = objToday + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
  months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear(),
  curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
  curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
  curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
  curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";  
  yesterday = (function(d){ d.setDate(d.getDate()-1); return d})(new Date);
  
  const todayWeek =  dayOfWeek;
  const todaysDate = dayOfMonth + " " +curMonth + "," +curYear;
  const currentTime = curHour + ":" + curMinute + curMeridiem;
  const currenTDate = "today is " + dayOfWeek;
  const curMonthDay = curMonth + dayOfMonth;
  const yestDate = "Yesterday was: " + yesterday;
  
  
  document.querySelector(".h11").textContent = todayWeek;
  document.querySelector(".h12").textContent = todaysDate;
  document.querySelector(".hour").textContent = currentTime;
  document.querySelector(".h40").textContent = currenTDate;
  document.querySelector(".h41").textContent = curMonthDay;
  document.querySelector(".h42").textContent = yestDate;
  
  

  const iconElement = document.querySelector(".weather-icon");
  const tempElement = document.querySelector(".temperature-value p");
  const descElement = document.querySelector(".temperature-description p");
  const locationElement = document.querySelector(".location p");
  const notificationElement = document.querySelector(".notification");
  
  // App data
  const weather = {};
  
  weather.temperature = {
      unit : "celsius"
  }
  
  // APP CONSTS AND VARS
  const KELVIN = 273;
  // API KEY
  const key = "82005d27a116c2880c8f0fcb866998a0";
  
  // CHECK IF BROWSER SUPPORTS GEOLOCATION
  if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(setPosition, showError);
  }else{
      notificationElement.style.display = "block";
      notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
  }
  
  // SET USER'S POSITION
  function setPosition(position){
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      
      getWeather(latitude, longitude);
  }
  
  // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
  function showError(error){
      notificationElement.style.display = "block";
      notificationElement.innerHTML = `<p> ${error.message} </p>`;
  }
  
  // GET WEATHER FROM API PROVIDER
  function getWeather(latitude, longitude){
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
      
      fetch(api)
          .then(function(response){
              let data = response.json();
              return data;
          })
          .then(function(data){
              weather.temperature.value = Math.floor(data.main.temp - KELVIN);
              weather.description = data.weather[0].description;
              weather.iconId = data.weather[0].icon;
              weather.city = data.name;
              weather.country = data.sys.country;
          })
          .then(function(){
              displayWeather();
          });
  }
  
  // DISPLAY WEATHER TO UI
  function displayWeather(){
      iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      descElement.innerHTML = weather.description;
      locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  }
  
  // C to F conversion
  function celsiusToFahrenheit(temperature){
      return (temperature * 9/5) + 32;
  }
  
  // WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
  tempElement.addEventListener("click", function(){
      if(weather.temperature.value === undefined) return;
      
      if(weather.temperature.unit == "celsius"){
          let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
          fahrenheit = Math.floor(fahrenheit);
          
          tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
          weather.temperature.unit = "fahrenheit";
      }else{
          tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
          weather.temperature.unit = "celsius"
      }
  });
  
  