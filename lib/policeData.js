// import policeData from '../files/data.json';
import fetch from 'node-fetch';

let policeData = async () => {
let apiData = [];
let dataMax;
let dataCalled = 0;
let resultOffSet = 0;

// Fetch all APIDATA for the application
const dataFetch = async () => {
    return fetch("https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/Major_Crime_Indicators/FeatureServer/0/query?where=1%3D1&outFields=reportedyear,MCI,Division,Neighbourhood&outSR=4326&resultRecordCount=50000&resultType=standard&resultOffset=" + resultOffSet + "&f=json")
        .then(function(resp){ 
            return resp.json()
        }).then(function(data){
          // Loop through data then flatten it into one array for using for querying
            apiData.push(data.features);
            resultOffSet += 32000;
            dataCalled += 32000;
            if (dataCalled < dataMax) {
                return dataFetch();
            } else {
                let myNewArray = [].concat.apply([], apiData);
               return myNewArray;
            }
        })
}

// Checks APIDATA length to know how many times to loop to call it all
 dataMax = await (await fetch("https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/Major_Crime_Indicators/FeatureServer/0/query?where=1%3D1&returnCountOnly=true&f=json")).json();
 console.log('dataMax', dataMax);

 const fetchCollection = async () => {
   let finalData = await (await dataFetch());
   return finalData
 }

    const callFinalData = await fetchCollection();
    return callFinalData
}

export default policeData;