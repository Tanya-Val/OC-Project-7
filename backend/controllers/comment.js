// Import necessary modules
const moment = require('moment');
const jwt = require('jsonwebtoken');
const connection = require('../db.js');

// Function to retrieve comments for a specific post
exports.getComments = (req, res) => {

  // SQL query to retrieve comments for a given post, including user information
  const commentsQuery = `SELECT comments.*, users.firstName, users.lastName 
    FROM comments 
    JOIN users ON comments.userID = users.userID 
    WHERE comments.postID = ? 
    ORDER BY comments.created_date DESC;`;

  // Execute the SQL query to fetch comments
  connection.query(commentsQuery, [req.query.postID], (err, data) => {
    if (err) {
      console.error('Error occurred while fetching comment:', err);
      return res.status(500).json(err);
    }

    // Log success message and return the comment data
    //console.log('Comment fetched successfully:', data);
    return res.status(200).json(data);
  });
};

// Function to add a new comment to a post
exports.addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!")

  // Verify the JWT token to get user information
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    // Define the SQL query to insert a new comment
    const commentsQuery = "INSERT INTO comments (`postID`, `userID`, `created_date`, `comment` ) VALUES (?, ?, ?, ?)";

    // Prepare the values to be inserted
    const values = [
      req.body.postID,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.comment
    ];

    // Execute the SQL query to add the comment
    connection.query(commentsQuery, values, (err, data) => {
      if (err) {
        console.error('Error occurred while adding a comment:', err);
        return res.status(500).json("Error occurred while adding a comment!");
      }

      // Log success message and return the result
      //console.log('Comment added successfully:', data);
      return res.status(200).json(data);
    });
  });
};

// Function to delete a comment
exports.deleteComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!")
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    // Log user information
    console.log('User Info:', userInfo);

    // Define the SQL query to delete a comment
    const deleteQuery = "DELETE FROM comments WHERE commentID = ? AND userID = ?";

    // Prepare the values for deletion
    const values = [
      req.body.commentID,
      userInfo.id
    ];

    // Execute the SQL query to delete the comment
    connection.query(deleteQuery, values, (err, data) => {
      if (err) {
        console.error('Error occurred while deleting a comment:', err);
        return res.status(500).json("Error occurred while deleting a comment!");
      }

      // Log the result of the deletion
      //console.log('Delete Result:', data);
      return res.status(200).json(data);
    });
  });
};

// Function to count the number of comments for a specific post
exports.countComments = (req, res) => {
  // Define the SQL query to count comments for a post
  const countQuery = 'SELECT COUNT(*) as commentCount FROM comments WHERE postID = ?';

  // Execute the SQL query to count comments
  connection.query(countQuery, [req.query.postID], (err, data) => {
    if (err) {
      console.error('Error occurred while counting comments:', err);
      return res.status(500).json(err);
    }

    // Return the count of comments
    return res.status(200).json(data[0].commentCount);
  });
};