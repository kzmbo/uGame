const mongoose = require("mongoose")

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

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    game_list: {
        games_played: [
            GameSchema
        ],
        games_wishlist: [
            GameSchema
        ]
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel