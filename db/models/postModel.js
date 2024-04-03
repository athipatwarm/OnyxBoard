const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    state: String,
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post