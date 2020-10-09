let mongoose = require('mongoose');

// const sample = {
//     username: "Something",
//     champion: "Teemo",
//     gameResult: "Victory",
//     date: "202-07-30T18:00:00Z"
// }

let areYouImprovingShema = new mongoose.Schema({
    username: {
        type: String,
        required: "Enter your Riot username.",
    },
    champion: {
        type: String,
        required: "Enter the champion you played.",
    },
    gameResult: {
        type: String,
        enum: ['Victory', 'Defeat'],
        default: 'Victory',
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose.model('AreYouImproving', areYouImprovingShema);