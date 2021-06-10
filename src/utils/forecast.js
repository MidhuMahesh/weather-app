const r = require('request')

const forecast = (longitude, latitude, callback) =>  {
    const url = 'http://api.weatherstack.com/current?access_key=1df6104335ad1de0e3967e156843644f&query='+ encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    r({ url, json: true}, (error, {body} = {}) => {
            if (error) {
                callback('Unable to connect to the internet!', undefined)
            } else if(body.error) {
                callback('Location not found:|', undefined)
            } else {
                callback(undefined, {
                    Temperature: body.current.temperature,
                    Precipitation: body.current.precip
                })
            }
        })
}

module.exports = forecast