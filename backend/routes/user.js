const express = require('express');
const multer = require('multer');
const path = require('path');

const { getUser, updateUser, uploadFile, deleteUser } = require('../controllers/user.js');

const router = express.Router();

// Set up Multer with a storage destination and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../frontend/public/upload/')
    },
    filename: function (req, file, cb) {
    
      cb(null, Date.now() + file.originalname);
    }
  })

const upload = multer({ storage: storage });

router.get("/find/:userID", getUser);
router.put("/update/:userID", updateUser);
//router.post("/uploadFile", upload.single('file'), uploadFile); // Add this line
router.delete("/delete/:userID", deleteUser); // Add this line for account deletion

module.exports = router;

// const express = require('express');

// const { getUser, updateUser } = require('../controllers/user.js');
// const router = express.Router();


// router.get("/find/:userID", getUser);
// router.put("/update/:userID", updateUser);

// module.exports = router;
