// function fetch data;
//function show today data
// function show nexts day
// function app to start
// http://api.weatherapi.com/v1/forecast.json?key=aa72de42f6f04a90a1c180713231508&q=London&days=3&aqi=no&alerts=no

const searchInput = document.getElementById("searchInput");
const btn = document.getElementById("btn");
const todayDay = document.querySelector(".today .day");
const todayDayNumber = document.querySelector(".today .dayNumber");
const todaymonthName = document.querySelector(".today .monthName");
const city = document.querySelector(".city");
const todayTemp = document.querySelector(".today .temp");
const todayIcon = document.querySelector(".today .icon");
const todayStatus = document.querySelector(".today .status");

const humidity = document.querySelector(".humidity");
const speed = document.querySelector(".speed");
const direction = document.querySelector(".direction");

const tomorrowDay = document.getElementsByClassName("nextDay_name");
const tomorrowTemp = document.getElementsByClassName("nextday_temp");
const smallTemp = document.getElementsByClassName("nextday_small");
const tomorrowIcon = document.getElementsByClassName("nextday_icon");
const tomorrowStatus = document.getElementsByClassName("nextday_status");

// const nextDay = document.querySelector("");

async function getData(country = "cairo") {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=aa72de42f6f04a90a1c180713231508&q=${country}&days=3&aqi=no&alerts=no`
  );

  response = await response.json();
  startApp(response);
}

function todayData(res) {
  const date = new Date(res.current.last_updated);

  todayDay.innerHTML = date.toLocaleDateString("en-us", { weekday: "long" });
  todayDayNumber.innerHTML = date.getDate();
  todaymonthName.innerHTML = date.toLocaleDateString("en-us", {
    month: "long",
  });

  todayTemp.innerHTML = `${res.current.temp_c}<sup>o</sup>C`;
  city.innerHTML = res.location.name;
  todayIcon.setAttribute("src", res.current.condition.icon);
  todayStatus.innerHTML = res.current.condition.text;

  humidity.innerHTML = `${res.current.humidity}%`;
  speed.innerHTML = `${res.current.wind_mph} km/h`;
  direction.innerHTML = `${res.current.wind_dir}`;
}

function nextData(res) {
  const date = new Date(res);

  for (let i = 0; i < 2; i++) {
    const date = new Date(res[i + 1].date);
    tomorrowDay[i].innerHTML = date.toLocaleDateString("en-us", {
      weekday: "long",
    });

    tomorrowTemp[i].innerHTML = res[i + 1].day.maxtemp_c;
    smallTemp[i].innerHTML = res[i + 1].day.mintemp_c;
    tomorrowIcon[i].setAttribute("src", res[i + 1].day.condition.icon);
    tomorrowStatus[i].innerHTML = res[i + 1].day.condition.text;
  }
}

function startApp(response) {
  todayData(response);
  nextData(response.forecast.forecastday);
}

getData();

searchInput.addEventListener("input", () => {
  getData(searchInput.value);
});

btn.addEventListener("click", () => {
  getData(searchInput.value);
});
