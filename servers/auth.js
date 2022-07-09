require('dotenv').config()

const express = require("express")

const UserModel = require("./model/user")


//MongoDB config
const URL_DB = process.env.URL_DB



const server = express()

const r = await 

server.listen(5000, () => {
    console.log('Auth server running on port 5000')
})