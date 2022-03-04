const request = require('request');
const constants = require('./config');

const w_data = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + constants.openWeatherMap.SECRET_KEY + '&q=' + encodeURIComponent(address) + '&aqi=no';
    request({url, json:true}, (error, {body})=> {
        if(error || body.hasOwnProperty("error"))
        {
            callback("Data Not Available !!!", undefined);
        }
        else
        {
            callback(undefined, {
                last_updated: body.current.last_updated,
                temp_c: body.current.temp_c,
                temp_f: body.current.temp_f,
                c_name: body.location.name,
                region: body.location.region,
                country: body.location.country
            });
        }
    });
}

module.exports = w_data;