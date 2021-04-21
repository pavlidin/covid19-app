const form = document.querySelector('form');
const select = document.getElementById('selectDropDown');
const results = document.querySelector('.results');
const canvasContainer = document.querySelector('.canvas-container');

const json = JSON.parse(results.innerHTML);
const areaid = document.querySelector('#selectDropDown').options[select.selectedIndex].value;

const getCovidData = (areaid) => {
    const filteredJsonArr = json.filter(e => {
        return e.areaid == areaid
    })
    return {
        firstdose: filteredJsonArr.map(e => e.totaldose1),
        seconddose: filteredJsonArr.map(e => e.totaldose2),
        totalvaccinations: filteredJsonArr.map(e => e.totalvaccinations),
        date: filteredJsonArr.map(e => moment(e.referencedate).format('DD/MM/YYYY'))
    }
}

const { firstdose, seconddose, totalvaccinations, date } = getCovidData(areaid)

const ctx = document.querySelector('#myChart');

myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: 'First doses',
            data: firstdose,
            backgroundColor: 'transparent',
            borderColor: 'purple',
            borderWidth: 2
        },
        {
            label: 'Second doses',
            data: seconddose,
            backgroundColor: 'transparent',
            borderColor: 'blue',
            borderWidth: 2
        },
        {
            label: 'Total vaccinations',
            data: totalvaccinations,
            backgroundColor: 'transparent',
            borderColor: 'green',
            borderWidth: 2
        }],
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

form.addEventListener('submit', e => {
    e.preventDefault();
    update();
})

select.addEventListener('change', () => {
    update();
})

const updateChartData = (f, s, t, d) => {
    myChart.data.datasets[0].data = f;
    myChart.data.datasets[1].data = s;
    myChart.data.datasets[2].data = t;
    myChart.data.labels.data = d;
    myChart.update();
};

const update = () => {
    const areaid = document.querySelector('#selectDropDown').options[select.selectedIndex].value;
    const { firstdose, seconddose, totalvaccinations, date } = getCovidData(areaid)
    updateChartData(firstdose, seconddose, totalvaccinations, date);
}