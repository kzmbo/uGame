require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
const cors = require("cors");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const saltRound = 10;

app.use(express.json());
app.use(cors());


//MongoDB config
const URL_DB = process.env.URL_DB
mongoose.connect(URL_DB, {useNewUrlParser: true})

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_KEY, {expiresIn: '30m'})
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_KEY, {expiresIn: '2h'})
}

//Logout endpoint; existing users get to sign off, removing refresh token and access token
app.post('/logout', async (req, res) => {
    const userId = req.body._id
    await UserModel.findByIdAndUpdate(userId, {refresh_token: null})
    return res.json({isLoggedIn: false})    
})


//Login endpoint; existing users are able to log back, giving them both an access token & refresh token
app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    await UserModel.find({email: email})
    .then((query) => {

        if (query.length != 0){
            const loginUser = JSON.parse(JSON.stringify(query))
            
            bcrypt.compare(password, loginUser[0].password, (err, isPasswordCorrect) => {
                if (err) throw err
                
                if (isPasswordCorrect){
                    const accessToken = generateAccessToken(loginUser[0])
                    const refreshToken = generateRefreshToken(loginUser[0])
                    UserModel.findOneAndUpdate({email: email}, {refresh_token: refreshToken}, (error, isUpdated) => {
                        if (error) throw error
                        UserModel.find({_id: loginUser[0]._id}).select({password: 0})
                        .then((userRes) => {
                            const userInfo = JSON.parse(JSON.stringify(userRes))
                            return res.json({isLoggedIn: true, user: userInfo[0]})
                        })
                        .catch((error) => {
                            return res.json({error: error})
                        })
                        
                    })
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
    const password = req.body.username
    const user = req.body


    //Checks for any existing email
    await UserModel.find({email: email})
    .then((res) => {
        if (res.length == 0) {
            bcrypt.hash(user.password, saltRound, async (err, hash) => {
                if (err) console.log(err)
                user.password = hash
                const newUser = new UserModel(user)
                await newUser.save()
            })
            return response.send("user sent")
        }
        return response.send("user exists already")
    }).catch((err) => {
        console.log(err)
    })   
})



app.listen(5000, () => {
    console.log('Auth server running on port 5000')
})