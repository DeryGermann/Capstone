let mongoose = require('mongoose');

// const public = {
//     "_id" : "the unique public puzzle id",
//     "image" : "base64 image",
//     "tags" : ['tags']
// }

let PublicSchema = new mongoose.Schema({
    image : {
        type: String,
        required: "Enter the image as base64"
    },
    tags : {
        type: Array,
    }
});
module.exports = mongoose.model('Public', PublicSchema);