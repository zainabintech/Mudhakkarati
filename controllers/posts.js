const express = require('express');

const router = express.Router();

const User = require('../models/user.js');


// Index - were it will show the journal entries
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        
        res.render('posts/index.ejs', {
            posts: currentUser.posts,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


// New - this is the form where to create a new post
router.get('/new', async (req, res) => {
    res.render('posts/new.ejs')
})

// Create - where you add the new post
router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.posts.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/posts`);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

  //Show - where you view a post entry 
  router.get('/:journalId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const posts = currentUser.posts.id(req.params.journalId);
  
      res.render('posts/show.ejs', {
        posts,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });




module.exports = router;