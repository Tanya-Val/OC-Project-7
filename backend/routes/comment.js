const express = require('express');
const { getComments, addComment, deleteComment, countComments } = require('../controllers/comment.js');
const router = express.Router();

router.get("/", getComments);
router.get("/count", countComments);
router.post("/", addComment);
router.delete("/", deleteComment);

module.exports = router;