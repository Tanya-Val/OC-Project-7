const express = require('express');

const { getUser } = require('../controllers/user.js');
const router = express.Router();


router.get("/find/:userID", getUser);

module.exports = router;
