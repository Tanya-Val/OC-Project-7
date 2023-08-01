const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db.js');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/forum.js');
const commentRoutes = require('./routes/comment.js');

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Allow Cross-Origin Resource Sharing (CORS) for your frontend origin
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

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
