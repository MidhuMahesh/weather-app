const p = require('path')
const h = require('hbs')
const ex = require('express')
// console.log(__dirname)
// console.log(__filename)
// console.log(p.join(__dirname, '..//public'))

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = ex()

const port = process.env.PORT || 3000

//define paths for express config
const pubpath = p.join(__dirname, '../public')
const viewspath = p.join(__dirname, '../templates/views')
const partpath = p.join(__dirname, '../templates/partials')

//setup handlebars engines ans views
app.set('view engine', 'hbs')
app.set('views', viewspath)
h.registerPartials(partpath)

//setup static directory to search
app.use(ex.static(pubpath))     //set up directory for the server

app.get('', (req,res)   =>  {
    res.render('index', {
        title: 'Weather Data',
        name: 'Midhu Mahesh'
    })
})
app.get('/about', (req,res) =>  {
    res.render('about', {
        title: 'About us',
        name: 'Midhu Mahesh'
    })
})
app.get('/help', (req,res) =>  {
    res.render('help', {
        title: 'Help page',
        name: 'Midhu Mahesh',
        service: 'refund'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Midhu',
//         age: 21
//     })
// })
// app.get('/about', (req,res) => {
//     res.send([{
//         name: 'Sreedhu',
//         Age: 13
//     },  {
//         name: 'Sreeja',
//         Age: 41
//     }])
// })
app.get('/weather', (req,res) => {
    if(!req.query.address)  {
        return res.send({
            error: 'provide addr please'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error)   {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)   {
                return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            }
        })
    })

    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'philadelphia',
    //     address: req.query.address
    // })
})

// app.get('/products', (req, res) =>  {
    
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req,res)   =>  {
    res.render('error', {
        title: 'Help article not found!',
        name: 'Midhu Mahesh'
    })
})
app.get('*', (req, res) =>  {
    res.render('error', {
        name: 'Midhu Mahesh',
        title: 'Error!!!'
    })
})

app.listen((port), () =>  {
    console.log('Server up and running')
})
//app.com
//app.com/help
//app.com/about