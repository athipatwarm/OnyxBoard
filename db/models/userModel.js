const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { response } = require('express')

require('dotenv').config()

const Schema = mongoose.schema

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true},
    password: {
        type: String,
        required: true},
    role: { 
        type: String,
        default: 'user' },
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now},
    tokens: String
})

userSchema.pre("save", async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 11)
    }
    next()
})

userSchema.methods.generateAuthTokens = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_JWT)
    user.tokens = token
    await user.save()
    return token
}

userSchema.statics.loginUser = async (username,password)=>{
    const user = User.findOne({username})
    if(!user){
        throw new Error("Wrong username or password")
    }
    const checkPassword = await bcrypt.compare(String(password),String(user.password))
    if(!checkPassword){
        throw new Error("Wrong username or password")
    }
    return user
}

const User = mongoose.model('User',userSchema)
module.exports = User

