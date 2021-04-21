const path = require('path');
const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const publicDirectorypath = path.join(__dirname, '../public');
const getUniqueAreas = require('./utils/getUniqueAreas');

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
            const jsonArr = response.data;
            const uniqueAreas = getUniqueAreas(response.data);

            res.render('index', {
                title: 'Covid Vaccinations in Greece',
                uniqueAreas,
                jsonArray: JSON.stringify(jsonArr)
            });
        })
        .catch((error) => {
            console.error(error)
        })
})

app.get('/data', (req, res) => {
    axios.get('https://data.gov.gr/api/v1/query/mdg_emvolio', {
        headers: {
            'Authorization': `Token ${process.env.api_token}`
        },
    })
        .then((response) => {
            res.jsonp(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});