//forum.js routes
const express = require('express');
const router = express.Router();
const { getPosts, addPost,editPost } = require('../controllers/post.js');

router.get("/", getPosts);
router.post("/", addPost);
router.put("/:postID", editPost); 


module.exports = router;
