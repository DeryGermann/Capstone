let mongoose = require('mongoose');
let requests = mongoose.model('Requests');
let securityService = require('../serviceSecurity');

// List all the requests
exports.request__listall = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            requests.find({}, (err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}

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

exports.requests_outgoing_delete = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            requests.findOneAndDelete(
                {
                    account_id: req.params.accountid,
                    outgoing_request: req.params.otherid
                }, function(err, data) {
                if(err) res.send(err);
                res.send(`_id: ${req.params.accountid} was successfully deleted from the requests table.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}
exports.requests_incoming_delete = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            requests.findOneAndDelete(
                {
                    account_id: req.params.accountid,
                    incoming_request: req.params.otherid
                }, function(err, data) {
                if(err) res.send(err);
                res.send(`_id: ${req.params.accountid} was successfully deleted from the requests table.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}