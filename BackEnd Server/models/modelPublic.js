let mongoose = require('mongoose');

let PublicSchema = new mongoose.Schema({
    puzzle_id: {
        type: String,
        required: "Enter id of the puzzle"
    },
    image: {
        type: String,
        required: "Enter the image as base64."
    },
    tags: {
        type: String,
        default: undefined
    },
    name: {
        type: String,
        default: "N/A"
    }
});
module.exports = mongoose.model('Public', PublicSchema);