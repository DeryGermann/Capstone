let mongoose = require('mongoose');

let RequestsSchema = new mongoose.Schema({
    account_id : {
        type: String,
        required: "Enter the account's id"
    },
    incoming_requests : {
        type: Array,
        default: undefined
    },
    outgoing_requests : {
        type: Array,
        default: undefined
    }
});
module.exports = mongoose.model('Requests', RequestsSchema);