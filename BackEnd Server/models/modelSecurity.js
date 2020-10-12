let mongoose = require('mongoose');

let securitySchema = new mongoose.Schema({
    apikey: {
        type: String,
        required: "Enter an Api Key.",
    }
});
module.exports = mongoose.model('Security', securitySchema);