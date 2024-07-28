
const apiKey = "6eb1180161eccb06843669dbee0f87b3";
const urlBase = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey;

function showLoader(){
  document.querySelector("#loader").style.display = "block";
}

function hideLoader(){
  document.querySelector("#loader").style.display = "none";
}

function showWeatherCard(){
  document.querySelector("#weatherCard").style.display = "block";
}

function getWeather(){
  const location = document.querySelector("#location").value;
  const url = `${urlBase}&q=${location}`;
  showLoader()
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const place = data.name;
      const country = data.sys.country;
      const weatherCondition = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;
      const weatherIcon = data.weather[0].icon;
      document.querySelector("#error").innerHTML = "";
      document.querySelector("#temperature").innerHTML = `${temperature}<sup>°</sup>C <div>Feels Like ${feelsLike}<sup>°</sup>C</div> <div>${place}, ${country}</div>`;
      document.querySelector("#condition").innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherCondition}"> `;
      document.querySelector("#windSpeed").innerHTML = `<img src="image/wind.png" height=80px width=80px >${windSpeed}  m/s`;
      document.querySelector("#humidity").innerHTML = `<img src="image/humidity.jpeg"  height=80px width=80px> ${humidity}%`;

      hideLoader();
      showWeatherCard();
    })
    .catch(error => {
      console.log("Error : ", error);
      document.querySelector("#error").innerHTML = "No Data Found!";
      document.querySelector(".weather-card").style.display = "none";
      hideLoader();
    })
}

document.querySelector("#submit").addEventListener("click", getWeather);