"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var connection = require('./db.js');

var cookieParser = require('cookie-parser');

var authRoutes = require('./routes/auth.js');

var userRoutes = require('./routes/user.js');

var postRoutes = require('./routes/forum.js');

var commentRoutes = require('./routes/comment.js');

var multer = require('multer'); // Middlewares


app.use(express.json());
app.use(cookieParser()); // Allow Cross-Origin Resource Sharing (CORS) for your frontend origin

var allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
})); //upload file- to maybe move to another document

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, '../frontend/public/upload');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({
  storage: storage
});
app.post("/api/upload", upload.single("file"), function (req, res) {
  var file = req.file;
  res.status(200).json(file.filename);
}); // More middleware and routes...

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forum', postRoutes);
app.use('/api/comments', commentRoutes);
app.use(function (req, res, next) {
  console.log('Request received!');
  next();
}); // Error handling and other middleware...

app.use(function (req, res, next) {
  console.log('Response sent successfully!');
});
module.exports = app;