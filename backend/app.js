// Import required modules
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

// Import route modules
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/forum.js');
const commentRoutes = require('./routes/comment.js');
const likesRoutes = require('./routes/likes.js');

// Middlewares

// Parse JSON request bodies
app.use(express.json());

// Parse cookies from the request
app.use(cookieParser());

// Allow Cross-Origin Resource Sharing (CORS) for your frontend origin
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({
  storage: storage
});

// Define an endpoint for file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
})

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/upload')));

// Routes for different parts of the application
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forum', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likesRoutes);

// Middleware for logging requests
app.use((req, res, next) => {
  console.log('Request received!');
  next();
});

// Error handling and other middleware...
app.use((req, res, next) => {
  console.log('Response sent successfully!');
});

// Export the Express app
module.exports = app;