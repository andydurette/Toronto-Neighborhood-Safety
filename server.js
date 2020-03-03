// Server Dependencies
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
// Inlcuding required data files
let policeData = require('./files/data.json');
let callMCI = require('./lib/callMCI.js');
let districtInfoCheck = require('./lib/districtInfoCheck.js');
let neighbourhoodsList = require('./lib/neighbourhoodsList.js');


// Create an instance of the express app.
let app = express();
// Host Static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, '/public')));
// Added so body parser can handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Set the port of our application, process.env.PORT lets the port be set by Heroku
let PORT = process.env.PORT || 9090;


/******************************* Routes  ****************************/

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/******************************* MiddleWare  ****************************/

app.get("/api/policeData", (req,res) => {
  res.json(policeData);
});

app.post("/api/mapMCI", (req,res) => {
  //console.log(req.body.district);
  //console.log(callMCI(req.body.district));
 res.json(callMCI(req.body.district));
});

app.get("/api/districtInfoCheck", (req,res) => {
 res.json(districtInfoCheck());
});

app.post("/api/neighbourhoodsList", (req,res) => {
  console.log(req.body.district);
  //res.sendStatus(200);
  //console.log(neighbourhoodsList(req.body.district));
  res.json(neighbourhoodsList(req.body.district)); 
  //res.sendStatus(200);
});






















// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});