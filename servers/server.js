require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
const session = require('express-session')
const cors = require("cors");
const bcrypt = require("bcrypt")
const { Store } = require('express-session')
const saltRound = 10;

app.use(express.json());
app.use(cors());
app.use(session({
    name: "uGameSession",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

//MongoDB config
const URL_DB = process.env.URL_DB
mongoose.connect(URL_DB, {useNewUrlParser: true})

//Middleware to check if user is authenticated
const verifyUser = (req, res, next) => {
    if (req.session.user) next()
    else next('route')
}


//Authenicating Users
//Logout endpoint; existing users get to sign off, removing refresh token and access token
app.post('/logout', async (req, res) => {
    const sid = req.body.sid
    Store.ge
    req.session.user = null
    console.log(req.session)

    req.session.save((err) => {
        if (err) next(err)

        req.session.regenerate((err) => {
            if (err) next(err)
            return res.json({isLoggedOut: true, session: {userId: req.session.user}})
        })
    })
})

//Login endpoint; existing users are able to log back, giving them both an access token & refresh token
app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    await UserModel.find({email: email})
    .then((user) => {

        if (user.length != 0){
            bcrypt.compare(password, user[0].password, (err, isPasswordCorrect) => {
                if (err) throw err
                
                if (isPasswordCorrect){
                    req.session.userId = user[0].id
                    res.json({session: req.session, sid: req.session.id})
                } else {
                    return res.json({isPasswordIncorrect: true})
                }
            })

        } else {
            return res.json({userNotFound: true})
        }
        
    })
    .catch((error) => {
        return res.json({error: error})
    }) 
})

//Sign up endpoint; new users are created here
app.post('/signup', async (req, response) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    //Checks for any existing email
    await UserModel.find({email: email})
    .then((res) => {
        if (res.length == 0) {
            bcrypt.hash(password, saltRound, async (err, hash) => {
                if (err) console.log(err)
                const newUser = new UserModel()
                newUser.username = username
                newUser.password = hash
                newUser.email = email
                await newUser.save()
            })
            return response.send("user sent")
        }
        return response.send("user exists already")
    }).catch((err) => {
        console.log(err)
    })   
})
//End Auth endpoints


//API calls for app
//Add games to wishlist 
app.post('/addgamewishlist', async (req, res) => {
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

app.put('/editplayedgame', async (req, res) => {
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
app.post('/addplayedgame', async (req, res) => {
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
app.delete('/deleteplayedgame', async (req, res) => {
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
app.delete('/deletewishlistgame', async (req, res) => {
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
