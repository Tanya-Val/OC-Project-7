//forum.js routes
const express = require('express');
const router = express.Router();
const { getPosts, addPost } = require('../controllers/post.js');

router.get("/", getPosts);
router.post("/", addPost);

module.exports = router;
