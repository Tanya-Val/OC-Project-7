// likes.js controllers

const connection = require('../db.js');
const jwt = require("jsonwebtoken");


exports.getLikes = (req, res) => {
    const query = 'SELECT userID FROM likes WHERE postID = ?';
    connection.query(query, [req.query.postID], (err, data) => {
      if (err) {
        console.error('Error occurred while fetching likes:', err);
        return res.status(500).json(err);
      }
      //console.log('Likes fetched successfully:', data);
      return res.status(200).json(data.map(like=>like.userID));
    });
};

exports.addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!")
  
      console.log(userInfo.id + "ADDING LIKES");
  
      const addLikeQuery = "INSERT INTO likes (`userID`, `postID`) VALUES (?, ?)";
  
      const values = [
        userInfo.id,
        req.body.postID 
        
      ];

      connection.query(addLikeQuery, values, (err, data) => {
        if (err) {
          console.error('Error occurred while adding a like:', err);
          return res.status(500).json("Error occurred while adding a like!");
        }
  
        console.log('LIKE added successfully:', data);
  
        return res.status(200).json("Like was added succefully!");
      });
    })
  };


  exports.deleteLike = (req, res) => {
    
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!")
  
      const deleteLikeQuery = "DELETE FROM likes WHERE `userID`=? AND `postID` = ?";


      connection.query(deleteLikeQuery, [userInfo.id, req.query.postID ], (err, data) => {
        if (err) {
          console.error('Error occurred while deleting the like:', err);
          return res.status(500).json("Error occurred while deleting the like!");
        }
  
        console.log('Like added successfully:', data);
  
        return res.status(200).json("Like was deleted succesfully");
      });
    })
  };

