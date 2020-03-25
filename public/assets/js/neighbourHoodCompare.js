(function() {
    // Selectors made for quick refrence lower in the code
    let district1 = document.querySelector("#district1");
    let district2 = document.querySelector("#district2");
    let neighbourhood1 = document.querySelector("#neighbourhood1");
    let neighbourhood2 = document.querySelector("#neighbourhood2");

    /***********************     FORM PREFILL DATA CALLED AND LOADED ON PAGE LOAD    ****************************/
    // Calla Api for form field values

    function setData(division) {
        // letiables for quick selection
        let divisionKeys = Object.keys(division).sort();
        // Gets the array from divisionKey to dynamicly create html options for a selection form element
        divisionKeys.forEach(function(item) {
            // Form Field one value creation and addition
            let option1 = document.createElement('option');
            option1.innerHTML = item;
            option1.setAttribute("value", item);
            district1.appendChild(option1);
            // Form Field two value creation and addition
            let option2 = document.createElement('option');
            option2.innerHTML = item;
            option2.setAttribute("value", item);
            district2.appendChild(option2);
        });
    }

    API.districtInfoCheck().then((division) => {
        setData(division.division);
    });


    /***********************     NEIGHBOURHOODCOMPARE FORM VALUE CHANGE EVENT HANDLERS    ****************************/
    
    // Runs events that are triggered by a form fields change of value

    async function districtUpdate(passedDistrict) {
        let neighbourhoodList;
        let neighbourhood;
        let district;
        let apiData;

            // Checks if the districts have been chosen so the button can be used to search for the data
            if (passedDistrict === "1"){
                let data = await API.neighbourhoodsList(district1.value);
                neighbourhoodList = await data;
                neighbourhood = neighbourhood1;
                district = district1;
                apiData = neighbourhoodList;
            }else if (passedDistrict === "2"){
                let data = await  API.neighbourhoodsList(district2.value);
                neighbourhoodList = await data;
                neighbourhood = neighbourhood2;
                district = district2;
                apiData = neighbourhoodList;
            }

            if (district1.value === "Empty" || district2.value === "Empty") {
                document.querySelector("#neighbourhoodCompareButton").disabled = true;
                document.querySelector("#neighbourhoodCompareButton").classList.add('disabled');
            } else {
                document.querySelector("#neighbourhoodCompareButton").disabled = false;
                document.querySelector("#neighbourhoodCompareButton").classList.remove('disabled');
            }

         
            // This checks if the district1 selection has been choosen, if it hasn't we disable the neighborhood1 selection as it we have not dynamicly generated the neighborhoods to it.
            if (district.value === "Empty") {
                neighbourhood.disabled = true;
            } else {
                neighbourhood.disabled = false;

                // We generate dynamicly the html selections for the nighbourhoods belonging to the district by using the Array generated from the above API data
                neighbourhood.innerHTML = '';
                let neighbourhoodListKeys = Object.keys(apiData).sort();
                neighbourhoodListKeys.forEach((item) => {
                    let option = document.createElement('option');
                    option.innerHTML = item;
                    option.setAttribute("value", item);
                    neighbourhood.appendChild(option);
                });  
        }
    }

    
    district1.addEventListener("change", (e) => districtUpdate("1"));
    district2.addEventListener("change", (e) => districtUpdate("2"));


    /***********************     NEIGHBOURHOODCOMPARE FORM SUBMISSION    ****************************/
    // Compares called data
    let neighbourHoodCompare = function(apiData) {
        // Set to Record all major crime indicators (MCI) from the APIDATA for one neighbourhood
        // Loop through to provide all the data on MCI'S and how many
        console.log(apiData);
        let crimeValues1 = Object.values(apiData.Neighbourhood1MCI);
        let crimeValues2 = Object.values(apiData.Neighbourhood2MCI);

    
        //Update chart data
        neighbourhoodChartDisplay.options.aspectRatio = 2;
        neighbourhoodChartDisplay.data.datasets[0].data = crimeValues1;
        neighbourhoodChartDisplay.data.datasets[1].data = crimeValues2;
        neighbourhoodChartDisplay.update();
    }
    
    // Upon the sections Button Click Run the above function
    document.querySelector("#neighbourhoodCompareBlock").addEventListener("submit", (e) => {
        e.preventDefault();
        API.neighbourhoodCompare(e).then((res) => { neighbourHoodCompare(res)} );
    });

})();