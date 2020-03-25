(function() {
    // Variables for quick selection
    let year1 = document.querySelector("#year1");
    let year2 = document.querySelector("#year2");
    let districtYearCompare = document.querySelector("#districtYearCompare");
    let neigbourhoodYearCompare = document.querySelector("#neighbourhoodYearCompare");


    /***********************     INITIAL NEIGHBOURHOODYEARCOMPARE FORM DATA     ****************************/
    // Object to hold values for looping and creating dynamicly generated html

    function setData(division, divisionYears) {
        // Variables for quick selection
        let districtYearCompareOptions = document.querySelector("#districtYearCompare");
        let divisionKeys = Object.keys(division).sort();
        // Gets the array from divisionKey to dynamicly create html options for a selection form element
        divisionKeys.forEach(function(item) {
            let option = document.createElement('option');
            option.innerHTML = item;
            option.setAttribute("value", item);
            districtYearCompareOptions.appendChild(option);
        });
 
        // Object to hold values for looping and creating dynamicly generated html
        // Data generated to above object from Querying ApiData
        let dataYearsKeys = Object.keys(divisionYears).sort();

        // Gets the array from divisionKey to dynamicly create html options for a selection form element
        dataYearsKeys.forEach(function(item) {
            let option1 = document.createElement('option');
            option1.innerHTML = item;
            option1.setAttribute("value", item);
            year1.appendChild(option1);
            let option2 = document.createElement('option');
            option2.innerHTML = item;
            option2.setAttribute("value", item);
            year2.appendChild(option2);
        });
    }

    API.districtInfoCheck().then((division) => {
        setData(division.division, division.dataYears);
    });

    /***********************     NEIGHBOURHOOD YEAR COMPARE FORM VALUE CHANGE EVENT HANDLERS    ****************************/

    // Runs events that are triggered by a form fields change of value
    async function districtYearUpdate() {
        let data = await API.neighbourhoodsList(districtYearCompare.value);
        let neighbourhoodList = await data;
        let apiData = neighbourhoodList;

           // This checks if the districts have been chosen so the button can be used to search for the data
            if (districtYearCompare.value === "Empty") {
               document.querySelector("#yearViewCompareButton").disabled = true;
               document.querySelector("#yearViewCompareButton").classList.add('disabled');
            }else {
               document.querySelector("#yearViewCompareButton").disabled = false;
               document.querySelector("#yearViewCompareButton").classList.remove('disabled');
           }
   
            // This checks if the district1 selection has been choosen, if it hasn't we disable the neighborhood1 selection as it we have not dynamicly generated the neighborhoods to it.
            if (districtYearCompare.value === "Empty") {
                neighbourhoodYearCompare.disabled = true;
            }else {
                neighbourhoodYearCompare.disabled = false;

                // We generate dynamicly the html selections for the nighbourhoods belonging to the district by using the Array generated from the above API data
                neigbourhoodYearCompare.innerHTML = '';
                let neighbourhoodListKeys = Object.keys(apiData).sort();
                neighbourhoodListKeys.forEach((item) => {
                    let option = document.createElement('option');
                    option.innerHTML = item;
                    option.setAttribute("value", item);
                    neigbourhoodYearCompare.appendChild(option);
                });  
        }
            
    };

    districtYearCompare.addEventListener("change", (e) => districtYearUpdate());

    /***********************     NEIGHBOURHOODYEARCOMPARE BUTTON TO UPDATE FORM START    ****************************/

    // Compares called data
    let neighbourHoodYearCompareData = function(apiData) {
        // Set to Record all major crime indicators (MCI) from the APIDATA for one neighbourhood by different years
        // Loop through to provide all the data on MCI'S and how many
        console.log(apiData);
       let crimeValues1 = Object.values(apiData.Neighbourhood1MCI);
        let crimeValues2 = Object.values(apiData.Neighbourhood2MCI);

    
        //Update chart data
        yearChartDisplay.options.aspectRatio = 2;
        yearChartDisplay.data.datasets[0].data = crimeValues1;
        yearChartDisplay.data.datasets[1].data = crimeValues2;
        yearChartDisplay.update();
    }

    /***********************     NEIGHBOURHOODYEARCOMPARE BUTTON TO UPDATE FORM END    ****************************/

      // Upon the sections Button Click Run the above function
    document.querySelector("#yearViewCompareBlock").addEventListener("submit", (e) => {
        e.preventDefault();
       API.neighbourhoodYearCompare(e).then((res) => { neighbourHoodYearCompareData(res)} );
    });

})();