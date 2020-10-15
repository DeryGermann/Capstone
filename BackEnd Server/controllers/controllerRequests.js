let mongoose = require('mongoose');
let requests = mongoose.model('Requests');
let securityService = require('../serviceSecurity');

// List all the requests
exports.request__create = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            let newRequest = new requests(req.body);
            newRequest.save((err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}