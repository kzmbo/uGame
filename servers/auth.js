require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
const cors = require("cors");
const bcrypt = require("bcrypt")
const saltRound = 10;

app.use(express.json());
app.use(cors());


//MongoDB config
const URL_DB = process.env.URL_DB
mongoose.connect(URL_DB, {useNewUrlParser: true})



app.post('/signup', async(req, response) => {
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
 

    //if (findExistingUser)


   
})



app.listen(5000, () => {
    console.log('Auth server running on port 5000')
})