let mongoose = require('mongoose');
let publicPuzzle = mongoose.model('Public');
let securityService = require('../serviceSecurity');

// List all the Public puzzles
exports.public__create = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            let newPublic = new publicPuzzle(req.body);
            newPublic.save((err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}