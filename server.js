require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const bcrypt = require("bcryptjs")
const saltRound = 10;
const path = require('path')
const port = process.env.PORT || 4000

app.use(cors({
    origin: 'https://ugameapp.netlify.app',
    credentials: true  // Allow credentials (cookies, authorization headers, etc.)
}));

//MongoDB config
const URL_DB = 'mongodb+srv://kembo:robl12345@ugame.1sbvva3.mongodb.net/?retryWrites=true&w=majority&appName=uGame'
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// {useNewUrlParser: true}
mongoose.connect(URL_DB, clientOptions )


app.use(express.json());

app.use(express.urlencoded({ extended: false }));


//Initialized collections for storing sessions
const store = new MongoDBStore({
    uri: URL_DB,
    collection: 'uGameSessions'
});

// Catches any error when creating collections for storing sessions
store.on('error', (error) => {
    console.log(error)
});

app.use(session({
    name: "uGameSession",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // One hour in Milliseconds
        httpOnly: false,
        sameSite: true
    },
    store: store
}))

// Authenicating Users
// Retrieves userId and sid if there's a cookie
app.get('/api/login', async (req, res) => {
    let isLoggedIn = false
    let user = null
    if (req.session.userID) {
        isLoggedIn = true
        await UserModel.findById(req.session.userID, 'username game_list')
        .then((response) => {
            user = response
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return res.json({userId: req.session.userID, user: user, sid: req.sessionID, isLoggedIn: isLoggedIn})
})

app.post('/api/getuser', async (req, res) => {
    const userID = req.body.userID
    if (userID) {
        await UserModel.findById(userID, 'username game_list')
        .then((user) => {
            console.log(user)
            res.send(user)
        })
        .catch((error) => {
            console.log(error)
        })
    }
})


//Logout endpoint; existing users get to sign off, removing refresh token and access token
app.post('/api/logout', async (req, res) => {
    req.session.destroy((error) => {
        if (error) throw error
        res.clearCookie('uGameSession').send({isLoggedIn: false})
    })
})

//Login endpoint; existing users are able to log back, giving them both an access token & refresh token
app.post('/api/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password


    await UserModel.find({email: email})
    .then((user) => {

        if (user.length != 0){
            bcrypt.compare(password, user[0].password, (err, isPasswordCorrect) => {
                if (err) throw err

                if (isPasswordCorrect){
                    req.session.userID = user[0].id
                    res.json({userID: user[0].id, sid: req.sessionID, isLoggedIn: true})
                } else {
                    return res.json({isLoggedIn: false})
                }
            })

        } else {
            return res.json({msg: 'Log In Error! User is not found', isLoggedIn: false})
        }

    })
    .catch((error) => {
        return res.json({error: error, msg: 'here'})
    })
})

//Sign up endpoint; new users are created here
app.post('/api/signup', async (req, response) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    if (email.length === 0 || username.length === 0 || password.length == 0) return response.json({
        msg: 'Sign Up Failed. Please fill in the fields correctly!', isSignedUp: false
    })

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

            return response.json({msg: 'Successfully created user', isSignedUp: true})
        }
        return response.json({msg: 'Sign Up Failed. Email already exists!', isSignedUp: false})
    }).catch((err) => {
        console.log(err)
    })
})
//End Auth endpoints


//Middleware to check if user is authenticated
const verifyUser = (req, res, next) => {
    if (req.session.userID) return next()
    return res.json({isLoggedIn: false})
}

//API calls for app
//Add games to wishlist
app.post('/api/addgamewishlist', verifyUser, async (req, res) => {
    const userID = req.body.userID
    const gameObj = req.body.game

    await UserModel.findById(userID, 'game_list games_wishlist')
    .then(async (db) => {
        db.game_list.games_wishlist.push(gameObj)
        await db.save()
        return res.send(db.game_list.games_wishlist)
    })
    .catch((error) => {
        console.log(error)
        return res.send(error)
    })
})

// Edits properties (game_status & game_rating) for a game stored in the DB
app.put('/api/editplayedgame', verifyUser, async (req, res) => {
    const userID = req.body.userID
    const gameID = req.body.gameID
    const status = req.body.gameStatus
    const rating = req.body.gameRating
    const hours = req.body.gameHoursPlayed

    await UserModel.findById(userID, 'game_list')
    .then((result) => {
        const listOfPlayedGames = result.game_list.games_played
        const gameToEdit = listOfPlayedGames.find(({id}) => id === gameID)
        gameToEdit.game_status = status
        gameToEdit.game_rating = rating
        gameToEdit.game_hours_played = hours
        result.save()
        res.json({msg: "Successfully edited game.", game: gameToEdit, statusCode: 200})
    })
    .catch((error) => {
        res.send(error)
    })
})

//Add games to played list
app.post('/api/addplayedgame', verifyUser, async (req, res) => {
    const userID = req.body.userID
    const gameObj = req.body.game

    await UserModel.findById(userID, 'game_list games_played')
    .then(async (db) => {
        const arr = db.game_list.games_played.push(gameObj)
        await db.save()
        return res.json({msg: "Game added successful"})
    })
    .catch((error) => {
        console.log(error)
        return res.send(error)
    })
})

//Deletes game from played list
app.delete('/api/deleteplayedgame', verifyUser, async (req, res) => {
    const userID = req.body.userID
    const gameID = req.body.gameID

    await UserModel.findById(userID, 'game_list')
    .then((result) => {
        const listOfPlayedGames = result.game_list.games_played
        const game = listOfPlayedGames.find(({id}) => id === gameID)
        const index = listOfPlayedGames.indexOf(game)

        listOfPlayedGames.splice(index, 1)
        result.save()

        res.json({msg: "Successfully Deleted Game!", statusCode: 200})
    })
    .catch((error) => {
        res.send(error)
    })
})

//Deletes game from wishlist
app.delete('/api/deletewishlistgame', verifyUser, async (req, res) => {
    const userID = req.body.userID
    const gameID = req.body.gameID

    await UserModel.findById(userID, 'game_list')
    .then((result) => {
        const listOfWishlistGames = result.game_list.games_wishlist
        const game = listOfWishlistGames.find(({id}) => id === gameID)
        const index = listOfWishlistGames.indexOf(game)

        listOfWishlistGames.splice(index, 1)
        result.save()

        res.json({msg: "Successfully Deleted Game!", statusCode: 200})
    })
    .catch((error) => {
        res.send(error)
    })
})

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => {
    console.log("API server running on port " + port)
})
