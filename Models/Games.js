const mongoose = require("mongoose");


const gameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    releaseYear: {type: Number, required: true},
    platform: {type: [String], required: true},
    rating: {type: Number, min: 1, max: 10},
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;