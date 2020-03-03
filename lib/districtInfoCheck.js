let policeData = require('../files/data.json');

// Object to hold values for looping and creating dynamicly generated html
let districtInfoCheck = () =>{

  let data = {
    division:{},
    dataYears:{}
  };

  // Police Divisions
  policeData.forEach(function(item) {
      if (!data.division[item.attributes.Division]) {
          data.division[item.attributes.Division] = item.attributes.Division
      }
  });

  // Years the data takes place within
  policeData.forEach(function(item) {
    if (!data.dataYears[item.attributes.reportedyear]) {
        data.dataYears[item.attributes.reportedyear] = item.attributes.reportedyear
    }
  });

  return data

}

module.exports = districtInfoCheck;