//user.js controllers

// Import necessary modules
const jwt = require('jsonwebtoken');
const connection = require('../db.js');
const bcrypt = require('bcrypt');

// Function to retrieve user information by userID
exports.getUser = (req, res) => {
    const userID = req.params.userID;
    const queryUser = "SELECT * FROM users WHERE userID=?";

    connection.query(queryUser, [userID], (err, data) => {
        if (err) return res.status(500).json(err);

        // Remove the password field from the user data before sending the response
        const { password, ...info } = data[0];
        return res.json(info);
    });
}

// Function to update user information
exports.updateUser = (req, res) => {
    const userID = req.params.userID;
    const updatedData = req.body;

    // Check if a new password is provided in the request
    if (updatedData.password) {
        // Hash the new password before updating
        const salt = bcrypt.genSaltSync(10);
        updatedData.password = bcrypt.hashSync(updatedData.password, salt);
    }

    const queryUpdateUser = "UPDATE users SET firstName=?, lastName=?, department=?, email=?, password=? WHERE userID=?;";

    connection.query(queryUpdateUser, [updatedData.firstName, updatedData.lastName, updatedData.department, updatedData.email, updatedData.password, userID], (err) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ message: "User updated successfully" });
    });
};


// Function to delete a user's account along with associated data
exports.deleteUser = (req, res) => {
    const userID = req.params.userID;

    // Delete likes associated with the user
    const deleteLikesQuery = "DELETE FROM likes WHERE userID = ?";
    connection.query(deleteLikesQuery, [userID], (err) => {
        if (err) {
            console.error('Error deleting likes:', err);
            return res.status(500).json(err);
        }

        // Delete comments created by the user
        const deleteCommentsQuery = "DELETE FROM comments WHERE userID = ?";
        connection.query(deleteCommentsQuery, [userID], (err) => {
            if (err) {
                console.error('Error deleting comments:', err);
                return res.status(500).json(err);
            }

            // Delete posts created by the user
            const deletePostsQuery = "DELETE FROM posts WHERE userID = ?";
            connection.query(deletePostsQuery, [userID], (err) => {
                if (err) {
                    console.error('Error deleting posts:', err);
                    return res.status(500).json(err);
                }

                // Finally, delete the user's account
                const deleteUserQuery = "DELETE FROM users WHERE userID = ?";
                connection.query(deleteUserQuery, [userID], (err) => {
                    if (err) {
                        console.error('Error deleting user account:', err);
                        return res.status(500).json(err);
                    }

                    // Return a success message
                    return res.status(200).json({ message: 'User account deleted successfully' });
                });
            });
        });
    });
};
