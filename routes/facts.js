let express = require('express')
let router = express.Router()

// retrieve our state data from our data file
// JSON is convenient if we're woking with local data
let stateData = require('./state_fact.json')

// Router looks at the request, for example '/api/minnesota'
// and decides what function to call to create a suitable response

// request, response, next (the order is important)
// next is used to send the request to another function
// to be handled, often in a case of an error
// handles a request to /about
router.get('/about', function(req, res, next) {
    // res (the response) is to send a JSON object in the response and
    // sets the content type to JSON to help the client know that
    // the response is JSON and not text, an image, CSS, HTML...
    return res.json({ 'about': 'It looks like you\'ve reached a valid route!' })
})

// responds to requests at /api/state-list
router.get('/state-list', function(req, res, next) {
    // provide us a list of just state names
    let stateNames = Object.keys(stateData) // just the keys from the object
    return res.json(stateNames)
})

// goal: /api/fact/stateName
// identify the pattern
// write one route handler which does this
// essentially, match /fact/something and get back a response
router.get('/fact/:stateName', function(req, res, next) {
    // req is all data about the request including the path, i.e: "/api/fact/California"
    // right now, the stateName's first letter is required to be uppercase
    let name = req.params.stateName
    let fact = stateData[name] // find the value associated with the key

    // if we don't find the state, send an error
    // otherwise, process normally
    if (!fact) {
        return res.status(404).send('State not found!')
    } else {
        return res.json({ name: name, fact: fact })
    }
})

module.exports = router

// anything after the exports is ignored
