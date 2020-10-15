let mongoose = require('mongoose');
let puzzle = mongoose.model('Puzzle');
let securityService = require('../serviceSecurity');

exports.puzzle__listall = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.find({}, (err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}

// List all the puzzles
exports.puzzle__create = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            let newPuzzle = new puzzle(req.body);
            newPuzzle.save((err, result) => {
                if(err) res.send(err);
                res.json(result);
            });
        } else {
            res.send('Invalid API Key.');
        }
    });
}

exports.puzzle_personal_delete = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.findOneAndDelete({account_id: req.params.accountid, personal_puzzle: req.params.personal}, function(err, data) {
                if(err) res.send(err);
                res.send(`Account ID: ${req.params.accountid}\nImage: ${req.params.personal}\nwas successfully deleted.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}

exports.puzzle_shared_delete = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.findOneAndDelete({account_id: req.params.accountid, shared_puzzle: req.params.shared}, function(err, data) {
                if(err) res.send(err);
                res.send(`Account ID: ${req.params.accountid}\nImage: ${req.params.shared}\nwas successfully deleted.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}