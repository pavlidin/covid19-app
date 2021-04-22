const results = document.querySelector('.results');
const canvasContainer = document.querySelector('.canvas-container');

const json = JSON.parse(results.innerHTML);

const totalvaccinations = json.map(e => e.totaldose1);
const area = json.map(e => e.area);
const totalVaccinationsPer100k = json.map(e => e.totalVaccinationsPer100k);

const ctx = document.querySelector('#myChart');

myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: area,
        datasets: [{
          label: "",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "yellow", "orange",
        "pink", "blue", "green"],
          data: totalVaccinationsPer100k
        }]
      },
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
