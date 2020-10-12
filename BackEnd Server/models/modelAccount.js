let mongoose = require('mongoose');
let fs = require('fs');

let profile_base64 = fs.readFileSync('./public/default_profile_pic.png', 'base64');

// const sample = {
//     account_id: "some crazy id given through mongo",
//     firstName: "Dery",
//     lastName: "Germann",
//     email: "something@gmail.com",
//     profilePicture: "image as base64"
// }

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
        default: profile_base64,
    }
});
module.exports = mongoose.model('Account', AccountSchema);