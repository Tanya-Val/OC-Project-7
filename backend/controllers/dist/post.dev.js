"use strict";

var moment = require('moment');

var jwt = require('jsonwebtoken');

var connection = require('../db.js');

exports.getPosts = function (req, res) {
  var token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", function (err, decodedToken) {
    if (err) return res.status(403).json("Token is not valid!");
    var userID = decodedToken.userID;
    var postsQuery = "SELECT posts.*, users.firstName, users.lastName, users.profilePicture \n    FROM posts \n    JOIN users ON posts.userID = users.userID \n    ORDER BY posts.created_date DESC;";
    connection.query(postsQuery, [userID], function (err, data) {
      if (err) {
        console.error('Error occurred while fetching posts:', err);
        return res.status(500).json(err);
      }

      console.log('Posts fetched successfully:', data);
      return res.status(200).json(data);
    });
  });
};

exports.addPost = function (req, res) {
  var token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", function (err, userInfo) {
    if (err) return res.status(403).json("Token is not valid!");
    console.log(userInfo);
    var postsQuery = "INSERT INTO posts (`userID`, `created_date`, `image`, `desc` ) VALUES (?, ?, ?, ?)";
    var values = [userInfo.id, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), req.body.image || null, // Provide the image or null
    req.body.desc];
    connection.query(postsQuery, values, function (err, data) {
      if (err) {
        console.error('Error occurred while adding a post:', err);
        return res.status(500).json("Error occurred while adding a post!");
      }

      console.log('Post added successfully:', data);
      return res.status(200).json(data);
    });
  });
};