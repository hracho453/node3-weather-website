const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6882d9633993d0db1f912aeae141cb6b&query=' + latitude + ',' + longitude + '&units=f';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const description = body.current.weather_descriptions[0];
            const precipChance = body.current.precip;

            callback(undefined, `${description}. It is currently ${temperature}°F out. There is a ${precipChance}% chance of rain.`);
        }
    });
};


module.exports = forecast;
d
