const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth')
const mongoose = require('mongoose')
const Post = require('../db/models/postModel')
const User = require('../db/models/userModel')
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router
    .route('/')
    .get(async (req, res, ) => {
        let searchOption = {}
            if (req.query.title != null && req.query.title !== ''){
                searchOption.title = new RegExp(req.query.title,'i')
            }
    
            try {
                const posts = await Post.find(searchOption)
                res.render('post', {
                    posts: posts, 
                    searchOption: req.query})
            } catch {
                res.redirect('/')
            }
        })

router
    .route('/allPost')
    .get(async(req, res) => {
        try {
            const posts = await Post.find({})
            res.status(200).json(posts)
        } catch(error) {
            res.status(500).json({message: error.message})
        }  
    })

    router
    .route('/create-post')
    .get(isAuth.authenticateToken, async (req, res) => {
      try {
        if (req.user) {
          const currentUser = await User.findById(req.user);
          if (currentUser) {
            console.log('Current user:', currentUser.username);
            res.render('createPost', {
              user: currentUser.username,
              id: currentUser._id,
            });
          }
        } else {
          res.redirect('/');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user. Please try again later.');
      }
    })
    .post(async (req, res) => {
      try {
        const currentUser = await User.findById(req.user);
        const { title, description } = req.body;
  
        const newPost = new Post({
            title,
            description,
            author: currentUser.username,
        });
  
        console.log('New post:', newPost); // Log the new post object
  
        await newPost.save();
        res.redirect('/');
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post. Please try again later.');
      }
    });

router
    .route('/:postID')
    .get((req, res) => {
    
        res.send('get post '+req.params.postID)
    })
    .put((req, res) => {
        res.send('update post '+req.params.postID)
    })
    .delete(async(req, res) =>{
        try {
            const { id } = req.params;
            const post = await Post.findByIdAndDelete(id);
            if (!post) {
                return res.status(404).json({ message: 'No post found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

module.exports = router