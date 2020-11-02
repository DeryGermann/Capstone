let mongoose = require('mongoose');
let account = mongoose.model('Account');
let securityService = require('../serviceSecurity');

exports.root = (req, res) => {
    res.send("API is running!");
}

// Lists all the users
exports.account__listall = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            account.find({}, (err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}

// Return specific account
exports.account__get = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            account.find({_id: req.params.accountid}, req.body, (err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}

// Creates an account
exports.account__create = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            let newAccount = new account(req.body);
            newAccount.save((err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}

exports.account__update = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            account.findOneAndUpdate({_id: req.params.accountid}, req.body, (err, data) => {
                if(err) res.send(err);
                res.send(`_id: ${req.params.accountid} was successfully updated.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}

exports.account__delete = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            account.findOneAndDelete({_id: req.params.accountid}, function(err, data) {
                if(err) res.send(err);
                res.send(`_id: ${req.params.accountid} was successfully deleted.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}