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

userSchema.statics.loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            // User not found
            return null;
        }

        const checkPassword = await bcrypt.compare(String(password), String(user.password));
        if (!checkPassword) {
            // Incorrect password
            return null;
        }

        // Passwords match! Return the user object
        return user;
    } catch (error) {
        // Handle any other errors (e.g., database connection issues)
        console.error('Error during login:', error.message);
        return null;
    }
};

const User = mongoose.model('User',userSchema)
module.exports = User

