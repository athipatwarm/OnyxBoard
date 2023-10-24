const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')

router.get('/',(req, res, ) => {
    res.render('users/index')
})

router
    .route('/new')
    .get((req, res, ) => {
    res.render('users/new', {user: new User()})
    .post((req, res) =>{
        res.send('create')
    })
})

router
    .route('/:userID')
    .get((req, res) => {
    
        res.send('get user '+req.params.userID)
    })
    .put((req, res) => {
        res.send('update user '+req.params.userID)
    })
    .delete((req, res) =>{
        res.send('delete user '+req.params.userID)
    })


module.exports = router
