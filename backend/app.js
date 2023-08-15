const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db.js');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/forum.js');
const commentRoutes = require('./routes/comment.js');

const multer  = require('multer');

// Middlewares
app.use(express.json());
app.use(cookieParser());




// Allow Cross-Origin Resource Sharing (CORS) for your frontend origin
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


//upload file- to maybe move to another document
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload')
  },
  filename: function (req, file, cb) {
  
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res)=>{
  const file = req.file;
  res.status(200).json(file.filename)
})

// More middleware and routes...

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forum', postRoutes);
app.use('/api/comments', commentRoutes);

app.use((req, res, next) => {
  console.log('Request received!');
  next();
});// Error handling and other middleware...
app.use((req, res, next) => {
  console.log('Response sent successfully!');
});
module.exports = app;
