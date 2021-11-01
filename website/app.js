/* Global Variables */
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");
let city = document.getElementById("city");
let description = document.getElementById("desc");
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData, "all DATA");
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.main.temp) + "°C";
    document.getElementById("content").innerHTML = allData.user.feel;
    document.getElementById("date").innerHTML = allData.user.date;
    let icon = allData.weather[0].icon;
    document.getElementById(
      "pic"
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    city.innerHTML = `City : ${allData.name}`;
    description.innerHTML = allData.weather[0].description;
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

/* Function to POST data */
const postData = async (url = "", data = []) => {
  console.log(data, "data");
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
// get zip on click
document.getElementById("generate").addEventListener("click", action);

function action() {
  let zipCode = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  postData("/getData", { zip: zipCode, date: newDate, feel: feelings });
  retrieveData();
}
