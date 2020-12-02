let mongoose = require('mongoose');

let RequestsSchema = new mongoose.Schema({
    account_id : {
        type: String,
        required: "Enter the account's id"
    },
    incoming_request : {
        type: String,
        default: undefined
    },
    outgoing_request : {
        type: String,
        default: undefined
    }
});
module.exports = mongoose.model('Requests', RequestsSchema);