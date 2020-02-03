let policeData = require('../files/data.json');

var callMCI = function(district) {  

  // Set to Record all major crime indicators (MCI) from the APIDATA
  var MCI = {}

  // Loop through to provide all the data on MCI'S and how many
  policeData.forEach(function(item){
    if ( item.attributes.Division === district ){
      if (MCI[item.attributes.MCI]){
        MCI[item.attributes.MCI] = MCI[item.attributes.MCI] + 1
      }else{
        MCI[item.attributes.MCI] = 1
       }
    }});

    // Provides data from loop for updading chart data
    var crimeValues = Object.values(MCI);
    var crimeTotal = 0;

    Object.values(MCI).forEach(function(item){
      crimeTotal = crimeTotal + item
    })

    return data = {
      crimeTotal: crimeTotal,
      crimeValues: crimeValues
    }
}

module.exports = callMCI;