let policeData = require('../files/data.json');

let neighbourhoodsList = (district1) =>{

  let neighbourhoodList1 = {}  
  policeData.forEach((item) => {
    if (item.attributes.Division === district1) {
        if (!neighbourhoodList1[item.attributes.Neighbourhood]) {
            neighbourhoodList1[item.attributes.Neighbourhood] = item.attributes.Neighbourhood;
        }
    }
  });

  return  neighbourhoodList1
}

module.exports = neighbourhoodsList;