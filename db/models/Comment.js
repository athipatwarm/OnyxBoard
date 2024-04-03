const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comid: String,
    content: String,
    author: String,
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Comment', commentSchema)