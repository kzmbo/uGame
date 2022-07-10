const mongoose = require("mongoose")

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
    refresh_token: {
        type: String,
        default: null
    },
    game_list: {
        games_played: [
          
        ],
        games_wishlist: [
           
        ]
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel