const moment = require('moment');
const jwt = require('jsonwebtoken');

const connection = require('../db.js');

exports.getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, decodedToken) => {
    if (err) return res.status(403).json("Token is not valid!")

    const userID = decodedToken.userID;

    const postsQuery = `SELECT posts.*, users.firstName, users.lastName, users.profilePicture 
    FROM posts 
    JOIN users ON posts.userID = users.userID 
    ORDER BY posts.created_date DESC;`;

    connection.query(postsQuery, [userID], (err, data) => {
      if (err) {
        console.error('Error occurred while fetching posts:', err);
        return res.status(500).json(err);
      }

      console.log('Posts fetched successfully:', data);

      return res.status(200).json(data);
    });
  })
};

exports.addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    console.log(userInfo)

    const postsQuery = "INSERT INTO posts (`userID`, `created_date`, `image`, `desc` ) VALUES (?, ?, ?, ?)";

    const values = [
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.image || null, // Provide the image or null
      req.body.desc,
    ];
    
    connection.query(postsQuery, values, (err, data) => {
      if (err) {
        console.error('Error occurred while adding a post:', err);
        return res.status(500).json("Error occurred while adding a post!");
      }

      console.log('Post added successfully:', data);

      return res.status(200).json(data);
    });
  })
};

