/* Global Variables */
const apiKey = "35d1727cc5aa9d0b9dd65e016e8b7f61";
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");
let city = document.getElementById("city");
let description = document.getElementById("desc");
let weatherData;
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

/* Function to GET weather Data */
const openWeather = async (url) => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    weatherData = await request.json();
    // console.log(weatherData, "all DATA");
    // Write updated data to DOM elements
  } catch (error) {
    console.log("error", error);
    // if we catch an error warn the user that the city was not found & update DOM elements.
    // appropriately handle the error
  }
};

/* Function to POST data */
const postData = async (url = "", data = []) => {
  // console.log(data, "data");
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = response;
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData, "all DATA");
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.wData.main.temp) + "°C";
    temp.style = "";
    document.getElementById("content").innerHTML = "you're feeling : " + allData.data.feel;
    document.getElementById("date").innerHTML = allData.data.date;
    let icon = allData.wData.weather[0].icon;
    document.getElementById(
      "pic"
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    city.innerHTML = `City : ${allData.wData.name}`;
    description.innerHTML = allData.wData.weather[0].description;
  } catch (error) {
    console.log("error", error);
    // if we catch an error warn the user that the city was not found & update DOM elements.
    document.getElementById("pic").src = "";
    city.innerHTML = "";
    temp.innerHTML = "City not found check the zipcode";
    temp.style = "color:red;";
    date.innerHTML = "";
    description.innerHTML = "";
    content.innerHTML = "";
    // appropriately handle the error
  }
};

// get zip on click
document.getElementById("generate").addEventListener("click", () => action())


async function action() {
  let zipCode = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=metric&appid=${apiKey}`;
  await openWeather(baseURL);
  try {
    postData("/getData", {
      weather: weatherData,
      zip: zipCode,
      date: newDate,
      feel: feelings,
    })
  } catch (error) {};
  retrieveData();
 };
  

