//Horizontal Bar Chart Data
var color = Chart.helpers.color; 
var horizontalBarChartData = {
    labels: ['Assault', 'Theft Over', 'Break and Enter', 'Robbery', 'Auto Theft'],
    datasets: [{
      label: 'District ID: ',
      backgroundColor: color("#3e41cd").alpha(0.5).rgbString(),
      borderColor: "#3e41cd",
      borderWidth: 1,
      data: [0, 0, 0, 0, 0]
  }]
};

/* Horizontal Bar Build Chart Start */
var ctx = document.getElementById("modalChart").getContext('2d');
var districtChartDisplay = new Chart(ctx,{
    type: 'horizontalBar',
    data: horizontalBarChartData,
    options: {
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: false,
      legend: {
        display: false
     },
      title: {
        display: true,
        text: '# of crime occurance'
      }
    }
  });


let crimeValues;
let crimeTotal;

let callMCI = function(district) {  

  const mciApi = {   
    async getRecordsP(district) {
      const res = await fetch("/api/mapMCI", {
        method: "POST",
        body: JSON.stringify({district}),
        headers: { "Content-Type": "application/json" }
      });
  
      const json = await res.json();

      crimeValues = json.crimeValues;
      crimeTotal = json.crimeTotal;

      //Update chart data
    districtChartDisplay.data.datasets[0].data = crimeValues;
    districtChartDisplay.options.title.text = `District ${district.substring(1, 3)} has had a total of ${crimeTotal} criminal events.`;
    districtChartDisplay.update();

    }
  }
  
mciApi.getRecordsP(district);


/* Horizontal Bar Build Chart Start */

document.querySelector('.modal-guts h2').innerHTML = `Crime during 2014-2019`;    
document.getElementById("modal").classList.remove("hide");
document.getElementById("modalOverlay").classList.remove("hide"); 

// Hide Modal
document.getElementById('close-button').addEventListener("click", function() {
  document.getElementById("modal").classList.add("hide");
  document.getElementById("modalOverlay").classList.add("hide");
});

}