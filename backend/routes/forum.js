//forum.js routes
const express = require('express');
const router = express.Router();
const { getPosts, addPost,editPost } = require('../controllers/post.js');

router.get("/", getPosts);
router.post("/", addPost);


// Add this route for editing a post
router.put("/:postID", editPost); // Add this route for editing a post


module.exports = router;
