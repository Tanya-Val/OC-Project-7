const express = require('express');
const router = express.Router();
const { getPosts } = require('../controllers/post.js');

router.get("/", getPosts);

module.exports = router;
