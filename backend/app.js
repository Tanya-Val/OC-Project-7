const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db.js');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');
const commentRoutes = require('./routes/comment.js');

//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Request received!');
  next();
});

// Allows Cross-Origin Resource Sharing (CORS) for all requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with the actual origin of your front-end
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Set to 'true' to allow credentials (cookies, authorization headers, etc.)
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// app.post('/signup', (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const department = req.body.department;
//   const email = req.body.email;
//   const password = req.body.password;

//   connection.query(
//     "INSERT INTO users (firstName, lastName, department, email, password) VALUES (?, ?, ?, ?, ?)",
//     [firstName, lastName, department, email, password],
//     (err, result) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         return res.status(500).json({
//           error: 'An error occurred while processing the request.'
//         });
//       }

//       console.log('Query executed successfully:', result);
//       res.json({
//         message: 'Signup successful!'
//       });
//     }
//   );
// });


//--------

// app.post('/', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   connection.query(
//     "SELECT * FROM users WHERE password = ? AND email = ?",
//     [password, email], // Note the order of password and email in the array
//     (err, results) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         return res.status(500).json({
//           error: 'An error occurred while processing the request.'
//         });
//       }

//       if (results.length > 0) {
//         // User found, send the user data
//         res.json(results);
//       } else {
//         // User not found, send an error message
//         res.json({
//           message: 'WRONG COMB'
//         });
//       }
//     }
//   );
// });

//-------

app.use((req, res, next) => {
  console.log('Request received!');
  next();
});

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({
//     message: 'Your request was successful!'
//   });
//   next();
// });

app.use((req, res, next) => {
  console.log('Response sent successfully!');
});

module.exports = app;