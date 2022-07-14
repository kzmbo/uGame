require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
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
                
    await UserModel.findById(userId, 'game_list games_wishlist')
    .then(async (db) => {
        const arr = db.game_list.games_wishlist.push(gameObj) 
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
    const status = req.body.status
    const rating = req.body.rating

    await UserModel.findById(userId, 'game_list')
    .then((result) => {
        const listOfPlayedGames = result.game_list.games_played
        const gameToEdit = listOfPlayedGames.find(({id}) => id === gameId)
        gameToEdit.game_status = status
        gameToEdit.game_rating = rating
        result.save()
        res.json({game: gameToEdit, statusCode: 200})
    })
    .catch((error) => {
        res.send(error)
    })
})

//Add games to played list
app.post('/addplayedgame', verifyToken, async (req, res) => {
    const userId = req.body.id
    const gameObj = req.body.game
                    
    await UserModel.findById(userId, 'game_list games_played')
    .then(async (db) => {
        const arr = db.game_list.games_played.push(gameObj)
        await db.save()
        return res.send(db.game_list.games_played)
    })
    .catch((error) => {
        console.log(error)
        return res.send(error)
    })
})

//Deletes game from played list
app.delete('/deleteplayedgame', verifyToken, async (req, res) => {
    const userId = req.body.userId
    const gameId = req.body.gameId

    await UserModel.findById(userId, 'game_list')
    .then((result) => {
        const listOfPlayedGames = result.game_list.games_played
        const game = listOfPlayedGames.find(({id}) => id === gameId)
        const index = listOfPlayedGames.indexOf(game)
        
        listOfPlayedGames.splice(index)
        result.save()
        
        res.json({listOfGames: listOfPlayedGames, statusCode: 200})
    })
    .catch((error) => {
        res.send(error)
    })
})

//Deletes game from wishlist
app.delete('/deletewishlistgame', verifyToken, async (req, res) => {
    const userId = req.body.userId
    const gameId = req.body.gameId

    await UserModel.findById(userId, 'game_list')
    .then((result) => {
        const listOfPlayedGames = result.game_list.games_wishlist
        const game = listOfPlayedGames.find(({id}) => id === gameId)
        const index = listOfPlayedGames.indexOf(game)
        
        listOfPlayedGames.splice(index)
        result.save()
        
        res.json({listOfGames: listOfPlayedGames, statusCode: 200})
    })
    .catch((error) => {
        res.send(error)
    })
})

app.listen(4000, () => {
    console.log("API server running on port 4000.")
})
