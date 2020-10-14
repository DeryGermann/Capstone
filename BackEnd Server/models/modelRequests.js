let mongoose = require('mongoose');

// const test = {
//     'account_id':"all the requests associated with this account",
//     'incoming_requests':['all incoming requests'],
//     'outgoing_requests':['all outgoing requests']
// }

let RequestsSchema = new mongoose.Schema({
    account_id : {
        type: String,
        required: "Enter the account's id"
    },
    incoming_requests : {
        type: Array
    },
    outgoing_requests : {
        type: Array
    }
});
module.exports = mongoose.model('Requests', RequestsSchema);