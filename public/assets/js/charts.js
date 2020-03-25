 /***********************     NEIGHBOURHOOD COMPARE CHART CREATION START    ****************************/
 var legendDirection = function() {
  if (window.innerWidth < 650) {
      return 'top'
  } else {
      return 'right'
  }
}

/* Data to pass to chart.js to create a chart for comparing NeighbourHoods Crime */
var color = Chart.helpers.color;
var horizontalBarChartData = {
  labels: ['Assault', 'Theft Over', 'Break and Enter', 'Robbery', 'Auto Theft'],
  datasets: [{
      label: 'District 1',
      backgroundColor: color("#3e95cd").alpha(0.5).rgbString(),
      borderColor: "#3e95cd",
      borderWidth: 1,
      data: [0, 0, 0, 0, 0]
  }, {
      label: 'District 2',
      backgroundColor: color("#8e5ea2").alpha(0.5).rgbString(),
      borderColor: "#8e5ea2",
      data: [0, 0, 0, 0, 0]
  }]
};
//Horizontal Bar Chart
var ctx = document.getElementById("neighbourhoodChart").getContext('2d');
var neighbourhoodChartDisplay = new Chart(ctx, {
  type: 'horizontalBar',
  data: horizontalBarChartData,
  options: {
      scales: {
          xAxes: [{
              ticks: {
                  min: 0,
                  suggestedMax: 100,
              },
          }]
      },
      elements: {
          rectangle: {
              borderWidth: 2,
          }
      },
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: false,
      legend: {
          position: legendDirection(),
      },
      title: {
          display: true,
          text: 'Yearly Crime Comparison Between Districts'
      }
  }
});
var chartLegendUpdate = function() {
  if (window.innerWidth < 650) {
      neighbourhoodChartDisplay.options.legend.position = "top";
      neighbourhoodChartDisplay.update();
  } else {
      neighbourhoodChartDisplay.options.legend.position = "right";
      neighbourhoodChartDisplay.update();
  }
}
window.addEventListener("resize", chartLegendUpdate);
window.addEventListener("orientationchange", chartLegendUpdate)
/***********************    NEIGHBOURHOOD COMPARE CHART CREATION END    ****************************/


/***********************    NEIGHBOURHOOD YEAR COMPARE CHART CREATION START    ****************************/

var legendDirection = function() {
  if (window.innerWidth < 650) {
      return 'top'
  } else {
      return 'right'
  }
}

/* Data to pass to chart.js to create a chart for comparing a NeighbourHood year to year Crime */
var color = Chart.helpers.color;
var horizontalBarChartData = {
    labels: ['Assault', 'Theft Over', 'Break and Enter', 'Robbery', 'Auto Theft'],
    datasets: [{
        label: 'District 1',
        backgroundColor: color("#3e95cd").alpha(0.5).rgbString(),
        borderColor: "#3e95cd",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0]
    }, {
        label: 'District 2',
        backgroundColor: color("#8e5ea2").alpha(0.5).rgbString(),
        borderColor: "#8e5ea2",
        data: [0, 0, 0, 0, 0]
    }]
};

//Horizontal Bar Chart
var ctx = document.getElementById("yearChart").getContext('2d');
var yearChartDisplay = new Chart(ctx, {
    type: 'horizontalBar',
    data: horizontalBarChartData,
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    min: 0,
                    suggestedMax: 100,
                },
            }]
        },
        elements: {
            rectangle: {
                borderWidth: 2,
            },
        },
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: false,
        legend: {
            position: legendDirection(),
        },
        title: {
            display: true,
            text: 'Yearly Crime Comparison Between Districts'
        }
    }
});

//Update chart legend to better display on mobile or desktop
var chartLegendUpdate = function() {
    if (window.innerWidth < 650) {
        yearChartDisplay.options.legend.position = "top";
        yearChartDisplay.update();
    } else {
        yearChartDisplay.options.legend.position = "right";
        yearChartDisplay.update();
    }
}

window.addEventListener("resize", chartLegendUpdate);
window.addEventListener("orientationchange", chartLegendUpdate)


/***********************     NEIGHBOURHOOD YEAR COMPARE CREATION END    ****************************/