if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express') 
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('Connected to Database'))
        .catch((err)=>console.error(err))
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('error', () => console.log('Connected to Mogoose'))



const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const catagoryRouter = require('./routes/catagories')
const topicRouter = require('./routes/topics')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')



app.use('/', indexRouter)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.use('/user', userRouter)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.use('/catagory', catagoryRouter)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.use('/topic', topicRouter)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.use('/post', postRouter)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.use('/comment', commentRouter)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.listen(process.env.PORT || 3000)