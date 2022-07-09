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
    game_list: {
        games_played: [
            {
                game_title: {
                    type: String
                },
                game_rating: {
                    type: String
                },
                game_status: {
                    type: String
                },

            }
        ],
        games_wishlist: [
            {
                game_title: {
                    type: String
                },
                game_release_date: {
                    type: String
                }
            }
        ]
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel