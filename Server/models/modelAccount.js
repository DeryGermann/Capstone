let mongoose = require('mongoose');
let fs = require('fs');

let img = fs.readFileSync('./public/default_profile_pic.png', 'base64');

let AccountSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "Enter your first name.",
    },
    lastName: {
        type: String,
        required: "Enter your last name.",
    },
    email: {
        type: String,
        required: "Enter your email.",
    },
    profilePicture: {
        type: String,
        default: img,
    },
    friendsList: {
        type: Array,
        default: []
    }
});
module.exports = mongoose.model('Account', AccountSchema);