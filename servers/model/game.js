const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    game_title: {
        type: String
    },
    game_status: {
        type: String
    },
    game_rating: {
        type: Number
    },
    game_screenshot_uri: {
        type: String
    },
    game_release_date: {
        type: String
    },
    game_platforms_images: [
        
    ]
})

const GameModel = mongoose.model('game', GameSchema)
module.exports = GameModel