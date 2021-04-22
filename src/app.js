const path = require('path');
const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const fs = require('fs');
const publicDirectorypath = path.join(__dirname, '../public');
const getUniqueAreas = require('./utils/getUniqueAreas');
const getLatest = require('./utils/getLatest');
const getPopulationData = require('./utils/getPopulationData');
const getTopVaccinatedAreas = require('./utils/getTopVaccinatedAreas');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectorypath));

app.get('/', (req, res) => {
    axios.get('https://data.gov.gr/api/v1/query/mdg_emvolio', {
        headers: {
            'Authorization': `Token ${process.env.api_token}`
        },
    })
        .then((response) => {
            const uniqueAreas = getUniqueAreas(response.data);

            res.render('index', {
                title: 'Covid Vaccinations in Greece',
                uniqueAreas,
                data: JSON.stringify(response.data)
            });
        })
        .catch((error) => {
            console.error(error)
        })
})

app.get('/latest', (req, res) => {
    axios.get(`https://data.gov.gr/api/v1/query/mdg_emvolio?referencedate=${getLatest()}`, {
        headers: {
            'Authorization': `Token ${process.env.api_token}`
        },
    })
        .then((response) => {
            res.jsonp(response.data);
        })
        .catch((error) => {
            console.error(error)
        })
})

app.get('/latesttopareas', (req, res) => {
    axios.get(`https://data.gov.gr/api/v1/query/mdg_emvolio?referencedate=${getLatest()}`, {
        headers: {
            'Authorization': `Token ${process.env.api_token}`
        },
    })
        .then((response) => {
            const rawPopulationData = fs.readFileSync(path.resolve(__dirname, './utils/populationData.json'));
            const populationJSON = JSON.parse(rawPopulationData);

            const populationData = getPopulationData(response.data, populationJSON);
            // res.render('topareas', {
            //     title: 'Latest Top 5 areas Vaccinated (per 100k people)',
            //     data: topAreas
            // })

            const topVaccinatedAreas = getTopVaccinatedAreas(populationData, 5, 'latest');

            res.jsonp(topVaccinatedAreas);
        })
        .catch((error) => {
            console.error(error)
        })
})

app.get('/totaltopareas', (req, res) => {
    axios.get(`https://data.gov.gr/api/v1/query/mdg_emvolio?referencedate=${getLatest()}`, {
        headers: {
            'Authorization': `Token ${process.env.api_token}`
        },
    })
        .then((response) => {
            const rawPopulationData = fs.readFileSync(path.resolve(__dirname, './utils/populationData.json'));
            const populationJSON = JSON.parse(rawPopulationData);

            const populationData = getPopulationData(response.data, populationJSON);
            // res.render('topareas', {
            //     title: 'Top 5 areas Vaccinated in Total (per 100k people)',
            //     data: topAreas
            // })

            const topVaccinatedAreas = getTopVaccinatedAreas(populationData, 5);

            res.jsonp(topVaccinatedAreas);
        })
        .catch((error) => {
            console.error(error)
        })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});