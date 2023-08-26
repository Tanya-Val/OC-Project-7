"use strict";

// Import required modules
var express = require('express');

var app = express();

var cors = require('cors');

var cookieParser = require('cookie-parser');

var multer = require('multer');

var path = require('path'); // Import route modules


var authRoutes = require('./routes/auth.js');

var userRoutes = require('./routes/user.js');

var postRoutes = require('./routes/forum.js');

var commentRoutes = require('./routes/comment.js');

var likesRoutes = require('./routes/likes.js'); // Middlewares
// Parse JSON request bodies


app.use(express.json()); // Parse cookies from the request

app.use(cookieParser()); // Allow Cross-Origin Resource Sharing (CORS) for your frontend origin

var allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
})); // Configure multer for file uploads

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
}); // Define an endpoint for file uploads

app.post("/api/upload", upload.single("file"), function (req, res) {
  var file = req.file;
  res.status(200).json(file.filename);
}); // Serve static files from the 'uploads' directory

app.use('/uploads', express["static"](path.join(__dirname, '../frontend/public/upload'))); // Routes for different parts of the application

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forum', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likesRoutes); // Middleware for logging requests

app.use(function (req, res, next) {
  console.log('Request received!');
  next();
}); // Error handling and other middleware...

app.use(function (req, res, next) {
  console.log('Response sent successfully!');
}); // Export the Express app

module.exports = app;