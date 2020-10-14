let mongoose = require('mongoose');

const test = {
    'account_id':"the account that is associated with this puzzle",
    'personal_puzzles': ['base64 images'],
    'shared_puzzles': ['base64 images']
}

let Puzzle = new mongoose.Schema({
    image : {
        type: String
    },
    tags: {
        type: Array
    }
});
let PuzzleSchema = new mongoose.Schema({
    account_id : {
        type: String,
        required: "Enter the account's id"
    },
    personal_puzzles: {
        type: [Puzzle]
    },
    shared_puzzles: {
        type: [Puzzle]
    }
});
module.exports = mongoose.model('Puzzle', PuzzleSchema);