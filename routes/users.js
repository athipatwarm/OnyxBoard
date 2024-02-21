const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')

router
    .route('/')
    .get(async (req, res, ) => {
    let searchOption = {}
        if (req.query.username != null && req.query.username !== ''){
            searchOption.username = new RegExp(req.query.username,'i')
        }

        try {
            const users = await User.find(searchOption)
            res.render('users/index', {
                users: users, 
                searchOption: req.query})
        } catch {
            res.redirect('/')
        }
    })
    

router
    .route('/new')
    .get((req, res, ) => {
    res.render('users/new', {user: new User()})
    })

    .post(async(req, res) =>{
        try {
            const user = await User.create(req.body)
            res.status(200).json(user)
        } catch(error) {
            res.status(500).json({message: error.message})
        }  
    })

router
    .route('/allUser')
    .get(async(req, res) => {
        try {
            const users = await User.find({})
            res.status(200).json(users)
        } catch(error) {
            res.status(500).json({message: error.message})
        }  
    })

router
    .route('/:id')
    .get(async(req, res) => {
        try {
            const {id} = req.params
            const user = await User.findByIdAndUpdate(id)
            res.status(200).json(user)
        } catch(error) {
            res.status(500).json({message: error.message})
        }  
    })
    .put(async(req, res) => {
        try{
            const {id} = req.params
            const user = await User.findById(id, req.body)
            if (!user){
                return res.status(404).json({message:'No user found'})
            }
            const updateUser = await User.findById(id)
            res.status(200).json(updateUser)
        } catch(error){
            res.status(500).json({message: error.message})
        }
    })
    .delete(async(req, res) =>{
        try {
            const {id} = req.params
            const user = await User.findByIdAndDelete(id)
            if (!user){
                return res.status(404).json({message:'No user found'})
            }
            const deleteUser = await User.findById(id)
            res.status(200).json({messaage: 'User Deleted'})
        } catch(error) {
            res.status(500).json({message: error.message})
        } 
    })


module.exports = router
