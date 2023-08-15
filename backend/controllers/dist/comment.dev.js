"use strict";

var moment = require('moment');

var jwt = require('jsonwebtoken');

var connection = require('../db.js');

exports.getComments = function (req, res) {
  var postsQuery = "SELECT comments.*, users.firstName, users.lastName, users.profilePicture \n    FROM comments \n    JOIN users ON comments.userID = users.userID \n    WHERE comments.postID = ? \n    ORDER BY comments.created_date DESC;";
  connection.query(postsQuery, [req.query.postID], function (err, data) {
    if (err) {
      console.error('Error occurred while fetching posts:', err);
      return res.status(500).json(err);
    }

    console.log('Posts fetched successfully:', data);
    return res.status(200).json(data);
  });
};

exports.addComment = function (req, res) {
  var token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", function (err, userInfo) {
    if (err) return res.status(403).json("Token is not valid!"); //console.log(userInfo)

    var commentsQuery = "INSERT INTO comments (`postID`, `userID`, `created_date`, `comment` ) VALUES (?, ?, ?, ?)";
    var values = [req.body.postID, // Make sure this corresponds to the correct post
    userInfo.id, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), req.body.comment]; //console.log(values);

    connection.query(commentsQuery, values, function (err, data) {
      if (err) {
        console.error('Error occurred while adding a comment:', err);
        return res.status(500).json("Error occurred while adding a comment!");
      } //console.log('Comment added successfully:', data);


      return res.status(200).json(data);
    });
  });
};