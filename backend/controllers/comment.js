const moment = require('moment');
const jwt = require('jsonwebtoken');

const connection = require('../db.js');

exports.getComments = (req, res) => {

    const commentsQuery = `SELECT comments.*, users.firstName, users.lastName, users.profilePicture 
    FROM comments 
    JOIN users ON comments.userID = users.userID 
    WHERE comments.postID = ? 
    ORDER BY comments.created_date DESC;`;

    connection.query(commentsQuery, [req.query.postID], (err, data) => {
        if (err) {
            console.error('Error occurred while fetching comment:', err);
            return res.status(500).json(err);
        }

        //console.log('Comment fetched successfully:', data);

        return res.status(200).json(data);
    });

};

exports.addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!")
  
      //console.log(userInfo)
  
      const commentsQuery = "INSERT INTO comments (`postID`, `userID`, `created_date`, `comment` ) VALUES (?, ?, ?, ?)";
  
      const values = [
        req.body.postID, // Make sure this corresponds to the correct post
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.comment
      ];
      

      //console.log(values);

      connection.query(commentsQuery, values, (err, data) => {
        if (err) {
          console.error('Error occurred while adding a comment:', err);
          return res.status(500).json("Error occurred while adding a comment!");
        }
  
        //console.log('Comment added successfully:', data);
  
        return res.status(200).json(data);
      });
    })
  };