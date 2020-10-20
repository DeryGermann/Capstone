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

exports.puzzle__update = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.findOneAndUpdate(
                {
                    _id: req.params.puzzleid,
                    account_id: req.params.accountid
                }, req.body, function(err, data) {
                if(err) res.send(err);
                res.send(`account_id: ${req.params.accountid} had its status updated.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}

exports.puzzle_personal_delete = (req, res) => {
    let apiKey = req.query.apikey;
    let personal = req.query.image;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.findOneAndDelete(
                {
                    account_id: req.params.accountid, 
                    "personal_puzzle.image": personal,
                    "personal_puzzle.name": req.params.name
                }, function(err, data) {
                if(err) res.send(err);
                res.send(`Account ID: ${req.params.accountid}\nName: ${req.params.name}\n\nImage: ${personal}\nwas successfully deleted.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}

exports.puzzle_shared_delete = (req, res) => {
    let apiKey = req.query.apikey;
    let shared = req.query.image;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.findOneAndDelete(
                {
                    account_id: req.params.accountid, 
                    "shared_puzzle.image": shared,
                    "shared_puzzle.name": req.params.name
                }, function(err, data) {
                if(err) res.send(err);
                res.send(`Account ID: ${req.params.accountid}\nName: ${req.params.name}\n\nImage: ${shared}\nwas successfully deleted.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}