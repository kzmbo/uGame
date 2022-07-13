require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
const GameModel = require("./model/game")
const Axios = require('axios')
const cors = require("cors");
const jwt = require('jsonwebtoken')


app.use(express.json());
app.use(cors());

//MongoDB config
const URL_DB = process.env.URL_DB
mongoose.connect(URL_DB, {useNewUrlParser: true})

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    const token = bearerHeader && bearerHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_KEY, (error, bearerToken) => {
        if (error) return res.sendStatus(403)
        req.token = bearerToken
        next()
    })
}

//Add games to wishlist 
app.post('/addgamewishlist', verifyToken, async (req, res) => {
    const userId = req.body.id
    const gameObj = req.body.game
    //Created Game Model
    const newGame = new GameModel(gameObj)
                
    await UserModel.findById(userId, 'game_list games_wishlist')
    .then(async (db) => {
        const arr = db.game_list.games_wishlist.push(newGame) 
        await db.save()
        return res.send(db.game_list.games_wishlist)
    })
    .catch((error) => {
        console.log(error)
        return res.send(error)
    })
})

app.put('/editplayedgame', verifyToken, async (req, res) => {
    const userId = req.body.userId
    const gameId = req.body.gameId

    await GameModel.findById(gameId)
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
})

//Add games to played list
app.post('/addplayedgame', verifyToken, async (req, res) => {
    const userId = req.body.id
    const gameObj = req.body.game
    //Created Game Model
    const newGame = new GameModel(gameObj)
                
    await UserModel.findById(userId, 'game_list games_played')
    .then(async (db) => {
        const arr = db.game_list.games_played.push(newGame)
        await db.save()
        return res.send(db.game_list.games_played)
    })
    .catch((error) => {
        console.log(error)
        return res.send(error)
    })
})



app.listen(4000, () => {
    console.log("API server running on port 4000.")
})
