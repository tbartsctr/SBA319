const mongoose = require("mongoose");


const gameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: [String], required: true},
    releaseYear: {type: Number, required: true},
    platform: {type: [String], required: true},
    rating: {type: Number, min: 1, max: 10},
});

gameSchema.index({title: 1});

gameSchema.index({rating: -1});

gameSchema.index({genre: 1});

gameSchema.index({releaseYear: -1});

gameSchema.index({platform: 1});


const Game = mongoose.model("Game", gameSchema);

module.exports = Game;