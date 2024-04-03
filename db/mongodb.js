const mongoose = require('mongoose')
require('dotenv').config

module.exports = function createMongoDb(){
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch((err)=>console.error(err))
}