let mongoose = require('mongoose');
let security = mongoose.model('Security');

exports.apikey__listall = (req, res) => {
    security.find({}, (err, result) => {
        if(err) res.send(err);
        res.json(result);
    });
}

exports.apikey_create = (req, res) => {
    let newApiKey = new security(req.body);
    newApiKey.save((err, result) => {
        if(err) res.send(err);
        res.json(result);
    });
}