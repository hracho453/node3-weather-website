const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: 'Hrach' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About androids new versions', name: 'Hrach' });
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', helpText: 'Call 044711200 for more information', name: 'Hrach' });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: ['GTA 5 rating-4.6 will be a nice variant for you']
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Hrach',
        errorMassage: 'Help page not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Hrach',
        errorMassage: 'Page not found'
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is up on http://localhost:${port}`);
});
