const request = require('request')

const geocode = (address, cb) => {
    
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoiZGVlcHB1cnBsZSIsImEiOiJjazV3Y2MzNjQwYWV3M29ta2FiOXFxN205In0.7P1nb3txSO12WRC-uJTEtQ'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            // save error to log system
            // send error mssg to admin
            // making geocode as flexible as possible
            cb('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            cb('Unable to find location. Try another search.', undefined)
        } else {
            cb(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode