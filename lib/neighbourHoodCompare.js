let policeData = require('../files/data.json');

let neighbourHoodCompare = (neighbourhood1, neighbourhood2) => {  
  // Set to Record all major crime indicators (MCI) from the APIDATA for one neighbourhood
    let Neighbourhood1MCI = {};
    // Loop through to provide all the data on MCI'S and how many
    policeData.forEach((item) => {
        if (item.attributes.Neighbourhood === neighbourhood1) {
            if (Neighbourhood1MCI[item.attributes.MCI]) {
                Neighbourhood1MCI[item.attributes.MCI] = Neighbourhood1MCI[item.attributes.MCI] + 1
            } else {
                Neighbourhood1MCI[item.attributes.MCI] = 1
            }
        }
    });

    // Set to Record all major crime indicators from the APIDATA for a second neighbourhood
    let Neighbourhood2MCI = {};
    policeData.forEach((item) => {
        if (item.attributes.Neighbourhood === neighbourhood2) {
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

  console.log(neighbourHoodCompare("Beechborough-Greenbrook (112)", "Alderwood (20)"));