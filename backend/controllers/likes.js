// likes.js controllers

// Import necessary modules
const connection = require('../db.js');
const jwt = require("jsonwebtoken");

// Function to retrieve likes for a specific post
exports.getLikes = (req, res) => {
    // SQL query to retrieve user IDs who liked a post
    const query = 'SELECT userID FROM likes WHERE postID = ?';
    connection.query(query, [req.query.postID], (err, data) => {
        if (err) {
            console.error('Error occurred while fetching likes:', err);
            return res.status(500).json(err);
        }
        //Log success message and return an array of user IDs who liked the post
        //console.log('Likes fetched successfully:', data);
        return res.status(200).json(data.map(like => like.userID));
    });
};

// Function to add a like to a post
exports.addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")

    // Verify the JWT token to get user information
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        //console.log(userInfo.id + " ADDING LIKES");

        // Define the SQL query to insert a new like
        const addLikeQuery = "INSERT INTO likes (`userID`, `postID`) VALUES (?, ?)";

        // Prepare the values to be inserted
        const values = [
            userInfo.id,
            req.body.postID
        ];

        // Execute the SQL query to add the like
        connection.query(addLikeQuery, values, (err, data) => {
            if (err) {
                console.error('Error occurred while adding a like:', err);
                return res.status(500).json("Error occurred while adding a like!");
            }

            // Log success message and return a response
            //console.log('LIKE added successfully:', data);
            return res.status(200).json("Like was added successfully!");
        });
    });
};

// Function to delete a like from a post
exports.deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")

    // Verify the JWT token to get user information
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        // Define the SQL query to delete a like
        const deleteLikeQuery = "DELETE FROM likes WHERE `userID`=? AND `postID` = ?";

        // Execute the SQL query to delete the like
        connection.query(deleteLikeQuery, [userInfo.id, req.query.postID], (err, data) => {
            if (err) {
                console.error('Error occurred while deleting the like:', err);
                return res.status(500).json("Error occurred while deleting the like!");
            }

            // Log success message and return a response
            //console.log('Like deleted successfully:', data);
            return res.status(200).json("Like was deleted successfully");
        });
    });
};
