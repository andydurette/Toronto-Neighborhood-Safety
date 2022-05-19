// Server Dependencies
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import callMCI from './lib/callMCI.js';
import districtInfoCheck from './lib/districtInfoCheck.js';
import neighbourhoodsList from './lib/neighbourhoodsList.js';
import neighbourhoodCompare from './lib/neighbourhoodCompare.js';
import neighbourhoodYearCompare from './lib/neighbourhoodYearCompare.js';

// Including required data files
// import policeData from './lib/policeData.js';
// let callPoliceData = await policeData();

// Create an instance of the express app.
let app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
// Host Static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, '/public')));
// Define middleware here, added parser to handle post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Host Static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, '/public')));
// Set the port of our application, process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 9090;


// /******************************* Routes  ****************************/

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// /******************************* MiddleWare  ****************************/

// app.get("/api/policeData", (req,res) => {
//   try{
//     return res.json();
//   }catch(err){
//     console.log('policeData error: ', err);
//     res.status(500).send(err);
//   }
// });

app.post("/api/mapMCI", (req,res) => {
  try {
    res.json(callMCI(req.body.district));
  } catch(err) {
    console.log('mapMCI error: ', err);
    res.status(500).send(err);
  }
 
});

app.get("/api/districtInfoCheck", (req,res) => {
  try {
    res.json(districtInfoCheck());
  } catch(err) {
    console.log('districtInfoCheck error: ', err);
    res.status(500).send(err);
  }
});


app.post("/api/neighbourhoodsList", (req,res) => {
  try {
    res.json(neighbourhoodsList(req.body.district)); 
  } catch(err) {
    console.log('neighbourhoodsList error: ', err);
    res.status(500).send(err);
  }
});

app.post("/api/neighbourhoodsCompare", (req,res) => {
  let neighbourhood1 = req.body.neighbourhood1;
  let neighbourhood2 = req.body.neighbourhood2;
  try {
    res.json(neighbourhoodCompare(neighbourhood1, neighbourhood2)); 
  } catch(err) {
    console.log('neighbourhoodsCompare error: ', err);
    res.status(500).send(err);
  }
});

app.post("/api/neighbourhoodYearCompare", (req,res) => {
  let neighbourhood1 = req.body.neighbourhood;
  let neighbourhoodYear1 = req.body.year1;
  let neighbourhoodYear2 = req.body.year2;
  try {
    res.json(neighbourhoodYearCompare(neighbourhood1, neighbourhoodYear1, neighbourhoodYear2)); 
  } catch(err) {
    console.log('neighbourhoodYearCompare error: ', err);
    res.status(500).send(err);
  }
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});