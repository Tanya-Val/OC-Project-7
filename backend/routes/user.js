const express = require('express');

const { getUser, updateUser } = require('../controllers/user.js');
const router = express.Router();


router.get("/find/:userID", getUser);
router.put("/update/:userID", updateUser);

module.exports = router;
