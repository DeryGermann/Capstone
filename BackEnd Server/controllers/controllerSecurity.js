let mongoose = require('mongoose');
let security = mongoose.model('Security');
let uuid = require('uuid');

exports.apikey__listall = (req, res) => {
    security.find({}, (err, result) => {
        if(err) res.send(err);
        res.json(result);
    });
}

exports.apikey__generatekey = (req, res) => {
    let id = req.body.id;

    if (id != "") {
        let newSecurity = new security();
        
        newSecurity.id = id;
        newSecurity.apikey = uuid.v4();
        // console.log(newSecurity.apikey);

        newSecurity.save((err, result) => {
            if(err) res.send(err);
            else res.send(newSecurity.apikey);
        });
    } else {
        res.send('Invalid ID, cannot create API Key.');
    }
}