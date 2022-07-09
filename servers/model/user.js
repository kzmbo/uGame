const mongoose = require("mongoose")

const UserSchema = (email, username, password) => { 
    return new mongoose.Schema({
        email: email,
        username: username,
        password: password,
        game_list: {
            games_played: {
                Array
            },
            games_wishlist: {
                Array
            }
        }
    })
}

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel