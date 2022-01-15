const express = require('express')
const routes = require('./routes/facts.js') // code API uses to respond to requests
const path = require('path')

app.use(express.static(path.join(__dirname, 'content')))

let app = express() // create the app

// anything that is sent to /api, send it to the routes file
app.use('/api', routes)

// handle a generic response if we hit a route that is not defined
app.use(function(err, req, res, next) {
    console.error('request to', req.originalUrl, 'errored because\n', err)
    res.status(404).send('Route not found!')
})

// create the server and listen on port 3000
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('app running on port', server.address().port)
})
