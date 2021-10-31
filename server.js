// Setup empty JS object to act as endpoint for all routes
projectData = {};

// include Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
const { json } = require("body-parser");
app.use(cors());

app.use(express.static("website"));

const apiKey = "35d1727cc5aa9d0b9dd65e016e8b7f61";

//port for express server
const port = process.env.PORT || 3000;

// initializing the server

const server = app.listen(port, listening);

function listening() {
  console.log("server running on localhost port: ", port);
}

data = [];

// post route that takes the zip from the user input & requests weather data from openweathermap's api & stores it in the data obj & returns it to the user

app.post("/weather", addWeather);
function addWeather(req, res) {
  let feelings = req.query.feelings;
  const zip = req.body.zip;
  request(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=metric&appid=${apiKey}`,
    function (error, response, body) {
    //   console.log(body);
      let data = JSON.parse(body);
        if (response.statusCode === 200) {
            res.status(200).send(body);
            app.get("/all", sendData);
            function sendData(request, response) {
                response.send(data);
            }
           } else (response.statusCode === 400); {
            res.status(400).send();
          }
    }
  );
}
// not found 404
app.get("*", (req, res) => {
  res.send("404 Page not found.");
});