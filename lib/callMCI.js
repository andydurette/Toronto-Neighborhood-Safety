import { readFile } from 'fs/promises';
const policeData = JSON.parse(
  await readFile(
    new URL('../files/data.json', import.meta.url)
  )
);

const callMCI = (district) => {  

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

    // Provides data from loop for updating chart data
    var crimeValues = Object.values(MCI);
    var crimeTotal = 0;

    Object.values(MCI).forEach(function(item){
      crimeTotal = crimeTotal + item
    })

    let data = {
      crimeTotal: crimeTotal,
      crimeValues: crimeValues
    }

    return data
}

export default callMCI;