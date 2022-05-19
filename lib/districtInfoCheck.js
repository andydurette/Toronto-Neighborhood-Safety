import { readFile } from 'fs/promises';
const policeData = JSON.parse(
  await readFile(
    new URL('../files/data.json', import.meta.url)
  )
);

// Object to hold values for looping and creating dynamically generated html
const districtInfoCheck = () =>{

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

export default districtInfoCheck;