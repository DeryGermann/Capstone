let mongoose = require('mongoose');
let securityService = require('../serviceSecurity');

let accountModel = require('../models/modelAccount');
let publicModel = require('../models/modelPublic');
let puzzleModel = require('../models/modelPuzzle');
let requestsModel = require('../models/modelRequests');

let accountData = [];
let publicData = [];
let puzzleData = [];
let requestsData = [];

let completeApi = [];

const getData = () => {
    // Gets ACCOUNT data from database
    accountModel.find({}, (err, result) => {
        if(err) res.send(err);
        accountData = [];
        accountData = accountData.concat(result);
    });

    // Gets PUBLIC data from database
    publicModel.find({}, (err, result) => {
        if(err) res.send(err);
        publicData = [];
        publicData = publicData.concat(result);
    });

    // Gets PUZZLE data from database
    puzzleModel.find({}, (err, result) => {
        if(err) res.send(err);
        puzzleData = [];
        puzzleData = puzzleData.concat(result);
    });

    // Gets REQUESTS data from database
    requestsModel.find({}, (err, result) => {
        if(err) res.send(err);
        requestsData = [];
        requestsData = requestsData.concat(result);
    });
}

const addPuzzlesToAccounts = () => {
    completeApi = {
        accounts: []
    };

    // Loop through ACCOUNT list
    accountData.forEach(account => {
        // Set account to a place holder variable
        let object_holder = JSON.parse(JSON.stringify(account));

        // Initializes a puzzle list within the account object
        let puzzles_holder = [];

        // Variable to be later added too
        let accountElement = [];
        
        // Loop through PUZZLE list and compare account ids
        puzzleData.forEach(puzzle => {
            // Converts the Mongo "JSON" into a workable JSON Object
            let puzzleJSON = JSON.parse(JSON.stringify(puzzle));

            if (puzzleJSON.account_id == object_holder._id) {
                // Checks if the puzzle belongs to the account
                // Then adds to the placeholder of "accountElement"
                if (!(puzzleJSON.hasOwnProperty('shared_puzzle'))){
                    if (!accountElement.includes(puzzleJSON.personal_puzzle)) {
                        accountElement.push(puzzleJSON.personal_puzzle);
                    }
                } else {
                    if (!accountElement.includes(puzzleJSON.shared_puzzle)) {
                        accountElement.push(puzzleJSON.shared_puzzle);
                    }
                }

                // Adds "accountElement" to "account.puzzle" list
                puzzles_holder = puzzles_holder.concat(accountElement);
            }
        });
        
        // Creates the "puzzles" key and assigned the value of the account's 
        // puzzles to that key.
        object_holder.puzzles = puzzles_holder;

        // Adds each ACCOUNT to the complete API list
        completeApi.accounts.push(object_holder);
    });
}

const addRequestsToAccounts = () => {
    // Loop through the accounts and compare account id's
    completeApi.accounts.forEach(account => {
        account.requests = {
            incoming: [],
            outgoing: []
        }

        // Converts the Mongo Object into a JSON Object
        let requestsJSON = JSON.parse(JSON.stringify(requestsData));

        // Loops through the REQUEST data
        requestsJSON.forEach(req => {
            if (account._id == req.account_id) {
                // Sorts the incoming and outgoing requests
                if (req.hasOwnProperty('outgoing_requests')) {
                    account.requests.outgoing.push(req.outgoing_requests[0]);
                } else {
                    account.requests.incoming.push(req.incoming_requests[0]);
                }
            }
        });
    });
}

// Creates and Sends API data
exports.create_API = (req, res) => {
    let apiKey = req.query.apikey;
    securityService.validateApiKey(apiKey, valid => {
        if (valid) {
            // Gets all the data from the database
            getData();

            // Add PUZZLES to associated ACCOUNTS
            addPuzzlesToAccounts();

            // Adds REQUESTS to the associated ACCOUNTS
            addRequestsToAccounts();

            // Adds the key "public" with the value of all the public puzzles.
            let publicJSON = JSON.parse(JSON.stringify(publicData));
            completeApi.public = publicJSON;

            res.json(completeApi);
        } else {
            res.send('Invalid API Key.');
        }
    });
}