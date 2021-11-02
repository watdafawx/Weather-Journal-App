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

// const apiKey = "35d1727cc5aa9d0b9dd65e016e8b7f61";

//port for express server
const port = process.env.PORT || 3000;

// initializing the server

const server = app.listen(port, listening);

function listening() {
  console.log("server running on localhost port: ", port);
}

app.post("/addData", addData);
function addData(req, res) {

projectData['wData'] = req.body.weather;
projectData['date'] = req.body.date;
projectData['temperature'] = req.body.temp;
projectData['feelings'] = req.body.feel;

res.send(projectData);
}

// Initialize all route with a callback function
app.get("/all", sendData);
// Callback function to complete GET '/all'
function sendData(req, res) {
  // projectData = JSON.parse(body);
  res.send(projectData);
}

// not found 404
app.get("*", (req, res) => {
  res.send("404 Page not found.");
});
