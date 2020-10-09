const mongoose = require('mongoose');
let security = mongoose.model('Security');

exports.validateApiKey = (apiKey, callback) => {
    security.find({apikey: apiKey}, function(err, results) {
        if (results.length < 1) return callback(false);
        else return callback(true);
    });
}