let mongoose = require('mongoose');
let puzzle = mongoose.model('Puzzle');
let securityService = require('../serviceSecurity');

// List all the puzzles
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
    let image_id = req.query.imageId;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.findOneAndDelete(
                {
                    account_id: req.params.accountid, 
                    _id : image_id,
                    "personal_puzzle.name": req.params.name
                }, function(err, data) {
                if(err) res.send(err);
                res.send(`Account ID: ${req.params.accountid}\nName: ${req.params.name}\n\nImage_ID: ${image_id}\nwas successfully deleted.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}

exports.puzzle_shared_delete = (req, res) => {
    let apiKey = req.query.apikey;
    let image_id = req.query.imageId;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            puzzle.findOneAndDelete(
                {
                    account_id: req.params.accountid, 
                    _id : image_id,
                    "shared_puzzle.name": req.params.name
                }, function(err, data) {
                if(err) res.send(err);
                res.send(`Account ID: ${req.params.accountid}\nName: ${req.params.name}\n\nImage ID: ${image_id}\nwas successfully deleted.`);
            });
        } else {
            res.json('Invalid API Key.');
        }
    });
}