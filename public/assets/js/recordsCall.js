// Create scripts and add them to the body of the page
let scriptAdd = function (src) {
    let srcAdd = document.createElement("script");
    srcAdd.setAttribute("src", src);
    document.querySelector("body").appendChild(srcAdd);
}

let finishSetup = () => {

// Add Script tags containing IIFE's for each sections functions to avoid polluting the global scope
scriptAdd('assets/js/apiCalls.js');
scriptAdd('assets/js/charts.js');
scriptAdd('assets/js/googleMaps.js');
scriptAdd('assets/js/districtCheck.js'); 
scriptAdd('assets/js/navControls.js');
scriptAdd('assets/js/neighbourHoodCompare.js');
scriptAdd('assets/js/neighbourHoodYearCompare.js');
scriptAdd('assets/js/time.js');
}

finishSetup()