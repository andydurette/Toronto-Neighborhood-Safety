let apiData = [];

const API = {
    async getRecords() {
        const res = await fetch(`/api/policeData`);
        const json = await res.json();
        //console.log(json);
        apiData = json
        finishSetup()
    }
}

API.getRecords();


let loadHide = function() {
    document.getElementById('loadingScreen').classList.add("hide")
};

// Creat scripts and add them to the body of the page
let scriptAdd = function (src) {
    let srcAdd = document.createElement("script");
    srcAdd.setAttribute("src", src);
    document.querySelector("body").appendChild(srcAdd);
}

let finishSetup = () => {
loadHide()
// Add Script tags containing IIFE's for each sections functions to avoid polluting the global scope
scriptAdd('assets/js/googleMaps.js'); // Not an IIFE yet need to check with instructors
scriptAdd('assets/js/districtCheck.js'); // Not an IIFE yet need to check with instructors
scriptAdd('assets/js/navControls.js');
scriptAdd('assets/js/neighbourHoodCompare.js');
scriptAdd('assets/js/neighbourHoodYearCompare.js');

}
