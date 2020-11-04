let mongoose = require('mongoose');

let PuzzleSchema = new mongoose.Schema({
    account_id : {
        type: String,
        required: "Enter the account's id"
    },
    personal_puzzle: {
        name: {
            type: String,
            default: undefined
        },
        image: {
            type: String,
            default: undefined
        },
        tags: {
            type: String,
            default: undefined
        },
        status: {
            type: String,
            enum: ['Shared', 'Public', 'Both', 'Personal'],
            default: 'Personal'
        }
    },
    shared_puzzle: {
        name: {
            type: String,
            default: undefined
        },
        image: {
            type: String,
            default: undefined
        },
        tags: {
            type: String,
            default: undefined
        },
    }
});
module.exports = mongoose.model('Puzzle', PuzzleSchema);