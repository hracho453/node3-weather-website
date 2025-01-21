const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaHJhY2h5YTQ1MzYiLCJhIjoiY201cjVjdmF5MDdsZzJqcXgzdTZ0b3BybCJ9.qwZn8KTq_YsVYCdGUQWeeg&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        console.log("some string" + JSON.stringify(body));
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { center, place_name: location } = body.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            });
        }
    });
};

module.exports = geocode;