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

  // Show - where you view a post entry 
router.get('/:postId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const post = currentUser.posts.id(req.params.postId); // changed `posts` to `post`
  
      res.render('posts/show.ejs', {
        post, // changed `posts` to `post`
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});


// Delete - Remove a journal entry
router.delete('/:postId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.posts.id(req.params.postId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/posts`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


 // Edit - Form to edit a journal entry
router.get('/:postId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const post = currentUser.posts.id(req.params.postId); // changed `posts` to `post`
  
      res.render('posts/edit.ejs', {
        post, // changed `posts` to `post`
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

  // Update - Save changes to a journal entry
router.put('/:postId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const posts = currentUser.posts.id(req.params.postId);
      posts.set(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/posts/${req.params.postId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
module.exports = router;