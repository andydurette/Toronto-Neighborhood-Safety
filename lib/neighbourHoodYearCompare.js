let policeData = require('../files/data.json');

let neighbourHoodYearCompare = (neighbourhood1, neighbourhoodYear1, neighbourhoodYear2) => {  

  // Set to Record all major crime indicators (MCI) from the APIDATA for one neighbourhood
    let Neighbourhood1MCI = {};
    let Neighbourhood2MCI = {};
    // Loop through to provide all the data on MCI'S and how many
    policeData.forEach((item) => {
        if (item.attributes.Neighbourhood === neighbourhood1 && item.attributes.reportedyear === Number(neighbourhoodYear1)) {
            if (Neighbourhood1MCI[item.attributes.MCI]) {
                Neighbourhood1MCI[item.attributes.MCI] = Neighbourhood1MCI[item.attributes.MCI] + 1
            } else {
                Neighbourhood1MCI[item.attributes.MCI] = 1
            }
        }
    });

    policeData.forEach((item) => {
        if (item.attributes.Neighbourhood === neighbourhood1 && item.attributes.reportedyear === Number(neighbourhoodYear2)) {
            if (Neighbourhood2MCI[item.attributes.MCI]) {
                Neighbourhood2MCI[item.attributes.MCI] = Neighbourhood2MCI[item.attributes.MCI] + 1
            } else {
                Neighbourhood2MCI[item.attributes.MCI] = 1
            }
        }
    });


    let data = {
      Neighbourhood1MCI: Neighbourhood1MCI,
      Neighbourhood2MCI: Neighbourhood2MCI
    }

    return data
  }


  //console.log(neighbourHoodYearCompare("Lambton Baby Point (114)", "2014", "2016"));

  module.exports = neighbourHoodYearCompare;