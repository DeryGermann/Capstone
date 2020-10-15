let mongoose = require('mongoose');

let PuzzleSchema = new mongoose.Schema({
    account_id : {
        type: String,
        required: "Enter the account's id"
    },
    personal_puzzle: {
        type: Array
    },
    shared_puzzle: {
        type: Array
    }
});
module.exports = mongoose.model('Puzzle', PuzzleSchema);