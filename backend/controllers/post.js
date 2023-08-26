// post.js controllers

// Import necessary modules
const moment = require('moment');
const jwt = require('jsonwebtoken');
const connection = require('../db.js');

// Function to retrieve posts
exports.getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!")

  // Verify the JWT token to get user information
  jwt.verify(token, "secretkey", (err, decodedToken) => {
    if (err) return res.status(403).json("Token is not valid!")

    const userID = decodedToken.userID;

    // SQL query to retrieve posts along with user information
    const postsQuery = `SELECT posts.*, users.firstName, users.lastName
    FROM posts 
    JOIN users ON posts.userID = users.userID 
    ORDER BY posts.created_date DESC;`;

    // Execute the SQL query to fetch posts
    connection.query(postsQuery, [userID], (err, data) => {
      if (err) {
        console.error('Error occurred while fetching posts:', err);
        return res.status(500).json(err);
      }

      // Log success message and return the post data
      //console.log('Posts fetched successfully:', data);
      return res.status(200).json(data);
    });
  })
};

// Function to add a new post
exports.addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!")

  // Verify the JWT token to get user information
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    // Define the SQL query to insert a new post
    const postsQuery = "INSERT INTO posts (`userID`, `created_date`, `image`, `desc` ) VALUES (?, ?, ?, ?)";

    // Prepare the values to be inserted
    const values = [
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.image || null,
      req.body.desc,
    ];

    // Execute the SQL query to add the post
    connection.query(postsQuery, values, (err, data) => {
      if (err) {
        console.error('Error occurred while adding a post:', err);
        return res.status(500).json("Error occurred while adding a post!");
      }

      // Log success message and return a response
      //console.log('Post added successfully:', data);
      return res.status(200).json(data);
    });
  })
};

// Function to edit a post
exports.editPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  // Verify the JWT token to get user information
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postID = req.params.postID;
    const newDesc = req.body.newDesc;

    // Check if the user is the owner of the post
    const checkOwnershipQuery = "SELECT userID FROM posts WHERE postID = ?";
    connection.query(checkOwnershipQuery, [postID], (err, result) => {
      if (err) {
        console.error('Error occurred while checking post ownership:', err);
        return res.status(500).json("Error occurred while checking post ownership!");
      }

      const ownerID = result[0].userID;

      if (ownerID !== userInfo.id) {
        // User is not the owner of the post, return an error
        return res.status(403).json("You are not the owner of this post!");
      }

      // User is the owner of the post, update the post description
      const updatePostQuery = "UPDATE posts SET `desc` = ? WHERE postID = ?";
      connection.query(updatePostQuery, [newDesc, postID], (err, data) => {
        if (err) {
          console.error('Error occurred while editing the post:', err);
          return res.status(500).json("Error occurred while editing the post!");
        }

        // Log success message and return a response
        //console.log('Post edited successfully:', data);
        return res.status(200).json(data);
      });
    });
  });
};