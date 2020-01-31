const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
// Supposed to live in a foler called views
// Where we are going to put our partials
hbs.registerPartials(partialsPath)

// This is the first part where express will look for a file
// to send back, in this case it would have been index
// but index doesn't exist
app.use(express.static(publicDirectoryPath))

// path needs to be from the root directory
// core module path gives us help with this

// json, sending back data that is intended
// to be consumed by code????

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Miller'
    })
})

app.get('/about', (req, res, next) => {
   res.render('about', {
       title: 'About Me',
       name: 'Miller'
   })
})

app.get('/help', (req, res, next) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Miller'
    })
})

app.get('/weather', (req, res, next) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        
        if (err) {
            return res.send({ err })
        }
    
        forecast(latitude, longitude, (err, forecastData) => {

            if (err) {
                return res.send({ err })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

// Second url that sends JSON
app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miller',
        errorMessage: 'Help article not found.'
    })
})

// Everything else * wild card
// Pay attention to the differrence between render and send
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miller',
        errorMessage: 'Page not found'
    })
})

// heroku provides us with a port value
// not a value we can hard code though
// changes over time via an enviroment variable
app.listen(port, () => {
    console.log('connected to port: ' + port)
})

// version control, revert back
// unless picture perfect memory
// without version control you live on the edge
// we will be using the git version system
// super fast and easy to work with
// the command we run must be from the root folder of the project
// vsc hides git directory
/*
git init, git status, git add (can list individual files git add src/ for example)
git add . (everything)
we don't want to track node modules, because its a generated directory
so it doesn't need to know what's inside of there
.gitignore node_modules/
node_modules greyed out so you know its being ignored
*/