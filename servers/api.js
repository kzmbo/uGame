require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
const GameModel = require("./model/game")
const cors = require("cors");
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(cors());

//MongoDB config
const URL_DB = process.env.URL_DB
mongoose.connect(URL_DB, {useNewUrlParser: true})

app.post('/addplayedgame', async (req, res) => {
    const userId = req.body.id
    // const gameObj = req.body.game

    //Created Game Model
    // const newGame = new GameModel(gameObj)

    await UserModel.findById(userId, 'game_list games_played')
    .then(async (db) => {
        const arr = db.game_list.games_played.push('Bloodborne')
        await db.save()
        res.send(db.game_list.games_played)
    })
    .catch((error) => {
        console.log(error)
        res.send(error)
    })
})

app.listen(4000, () => {
    console.log("API server running on port 4000.")
})
