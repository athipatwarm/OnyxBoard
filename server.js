if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express') 
const bodyParser = require('body-parser')
const app = express()
// const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const csrfProtection = csrf({cookie: true})
const path = require('path')
const db = require('./db/mongodb')
db()

app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
app.use(express.static(path.join(__dirname,"public")))
// app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))
app.use(cookieParser())
app.use(csrfProtection)

const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// mongoose.connect(process.env.DATABASE_URL)
//         .then(() => console.log('Connected to Database'))
//         .catch((err)=>console.error(err))

// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('error', () => console.log('Connected to Mogoose'))



const indexRouter = require('./routes/index')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
// const catagoryRouter = require('./routes/catagories')
// const topicRouter = require('./routes/topics')
// const commentRouter = require('./routes/comments')
const isAuth = require('./middleware/isAuth')

app.use(cookieParser())
app.use(isAuth.authenticateToken, (req,res,next) =>{
    res.locals.isAuth = req.user
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use('/', indexRouter)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.use('/users', userRoutes)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.use('/post', postRoutes)
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

// app.use('/catagory', catagoryRouter)
// function logger(req, res, next){
//     console.log(req.originalUrl)
//     next()
// }

// app.use('/topic', topicRouter)
// function logger(req, res, next){
//     console.log(req.originalUrl)
//     next()
// }

// app.use('/comment', commentRouter)
// function logger(req, res, next){
//     console.log(req.originalUrl)
//     next()
// }

app.listen(process.env.PORT || 3000)