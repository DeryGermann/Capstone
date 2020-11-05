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

exports.requests__delete = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            requests.findOneAndDelete(
                {
                    account_id: req.params.accountid
                },{ incoming : req.params.otherid } || { outgoing : req.params.otherid }, function(err, data) {
                if(err) res.send(err);
                res.send(`_id: ${req.params.accountid} was successfully deleted from the requests table.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}