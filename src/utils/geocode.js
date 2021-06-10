const request = require('request')

const gcode = (address, callback) =>    {
    const urlg = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlkaHUxMiIsImEiOiJja3A3N2p6dHQxM2NuMm9zMW15eGFoOTd4In0.5R4Xk3NzVwPbB8Xyc_T9kw'
    request({url: urlg, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the internet!', undefined)
        }   else if(body.features.length === 0) {
            callback('Location not found:|', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = gcode