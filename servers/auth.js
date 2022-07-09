require('dotenv').config()

const express = require("express")
const { MongoClient } = require("mongodb")
const UserModel = require("./model/user")

const URL_DB = process.env.URL_DB


const server = express()

server.listen(5000, () => {
    console.log('Auth server running on port 5000')
})