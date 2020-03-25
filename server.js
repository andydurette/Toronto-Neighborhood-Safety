// Server Dependencies
const express = require("express");
const path = require('path');
// Inlcuding required data files
let policeData = require('./files/data.json');
let callMCI = require('./lib/callMCI.js');
let districtInfoCheck = require('./lib/districtInfoCheck.js');
//let neighbourhoodsList = require('./lib/neighbourhoodsList.js');
//let neighbourhoodCompare = require('./lib/neighbourhoodCompare.js');
//let neighbourhoodYearCompare = require('./lib/neighbourhoodYearCompare.js');


// Create an instance of the express app.
let app = express();
// Host Static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, '/public')));
// Define middleware here, added parser to handle post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Host Static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, '/public')));
// Set the port of our application, process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 9090;


/******************************* Routes  ****************************/

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/******************************* MiddleWare  ****************************/

app.get("/api/policeData", (req,res) => {
  res.json(policeData);
});

app.post("/api/mapMCI", (req,res) => {
 res.json(callMCI(req.body.district));
});

app.get("/api/districtInfoCheck", (req,res) => {
 res.json(districtInfoCheck());
});


app.post("/api/neighbourhoodsList", (req,res) => {
  res.json(neighbourhoodsList(req.body.district)); 
});
/*
app.post("/api/neighbourhoodsCompare", (req,res) => {
  let neighbourhood1 = req.body.neighbourhood1;
  let neighbourhood2 = req.body.neighbourhood2;
  res.json(neighbourhoodCompare(neighbourhood1,neighbourhood2)); 
});

app.post("/api/neighbourhoodYearCompare", (req,res) => {
  let neighbourhood1 = req.body.neighbourhood;
  let neighbourhoodYear1 = req.body.year1;
  let neighbourhoodYear2 = req.body.year2;
  res.json(neighbourhoodYearCompare(neighbourhood1, neighbourhoodYear1, neighbourhoodYear2)); 
});
*/


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});