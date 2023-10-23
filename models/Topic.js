const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    tid: String,
    name: String,
    catagory: String,
    post: String,
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Topic', topicSchema)