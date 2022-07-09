require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./model/user")
const cors = require("cors");

app.use(express.json());
app.use(cors());


//MongoDB config
const URL_DB = process.env.URL_DB
mongoose.connect(URL_DB, {useNewUrlParser: true})



app.post('/signup', async(req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.username
    const newUser = UserModel(email, username, password)
    await newUser.save()
        .then(() => {
            console.log("User saved")
        })
        .catch(() => {
            console.log("Error: User not saved into DB")
        })

    res.send("user sent")
})



app.listen(5000, () => {
    console.log('Auth server running on port 5000')
})