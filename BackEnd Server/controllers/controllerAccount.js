let mongoose = require('mongoose');
let account = mongoose.model('Account');
let securityService = require('../serviceSecurity');

exports.root = (req, res) => {
    res.send("API is running!");
}

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

// exports.record__updateRecord = (req, res) => {
//     let apiKey = req.query.apikey;
//     securityService.validateApiKey(apiKey, valid => {
//         if (valid) {
//             record.findOneAndUpdate({_id: req.params.recordid}, req.body, function(err, data) {
//                 if(err) res.send(err);
//                 res.send(`_id: ${req.params.recordid} was successfully updated.`);
//             });
//         } else {
//             res.json('Invalid API Key.');
//         }
//     });
// }

// exports.record__deleteRecord = (req, res) => {
//     let apiKey = req.query.apikey;
//     securityService.validateApiKey(apiKey, valid => {
//         if (valid) {
//             record.findOneAndDelete({_id: req.params.recordid}, function(err, data) {
//                 if(err) res.send(err);
//                 res.send(`_id: ${req.params.recordid} was successfully deleted.`);
//             });
//         } else {
//             res.json('Invalid API Key.');
//         }
//     });
// }