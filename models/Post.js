const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    pid: String,
    title: String,
    content: String,
    author: String,
    state: String,
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', postSchema)