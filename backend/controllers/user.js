//user.js controllers

const jwt = require('jsonwebtoken');
const {
    info
} = require('npmlog');
const connection = require('../db.js');
const bcrypt = require('bcrypt');

exports.getUser = (req, res) => {
    //todo 1.56

    const userID = req.params.userID;
    const queryUser = "SELECT * FROM users WHERE userID=?";

    connection.query(queryUser, [userID], (err, data) => {
        if (err) return res.status(500).json(err);

        const {
            password,
            ...info
        } = data[0];
        return res.json(info);
    })
}

exports.updateUser = (req, res) => {
    const userID = req.params.userID;
    const updatedData = req.body;
    console.log(updatedData, "console.log(updatedData)")


    // Check if a new password is provided in the request
    if (updatedData.password) {
        // Hash the new password before updating
        const salt = bcrypt.genSaltSync(10);
        updatedData.password = bcrypt.hashSync(updatedData.password, salt);
    }

    // Check if a new profile picture is provided in the request
    if (updatedData.profilePicture) {
        // Only save the filename in the database
        updatedData.profilePicture = updatedData.profilePicture.slice(updatedData.profilePicture.lastIndexOf('/') + 1);
    }

    const queryUpdateUser = "UPDATE users SET firstName=?, lastName=?, department=?, profilePicture=? WHERE userID=?;";

    connection.query(queryUpdateUser, [updatedData.firstName, updatedData.lastName, updatedData.department, updatedData.profilePicture, userID], (err) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ message: "User updated successfully" });
    });
};




exports.uploadFile = (req, res) => {
    console.log(req.file); // Add this line
    if (!req.file) {
        return res.status(400).json({
            message: 'No file uploaded'
        });
    }

    // Extract the filename from the file path
    const filename = req.file.path.slice(req.file.path.lastIndexOf('/') + 1);

    return res.status(200).json({
        filename: filename

    });
}

// user.js controllers

// ... (other controller functions)

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

                    console.log('User account and associated data deleted successfully');
                    
                
                    
                    
                    return res.status(200).json({ message: 'User account deleted successfully' });
                });
            });
        });
    });
};


// const jwt = require('jsonwebtoken');
// const { info } = require('npmlog');
// const connection = require('../db.js');
// const bcrypt = require('bcrypt');

// exports.getUser = (req, res) => {
//     //todo 1.56

//     const userID = req.params.userID;
//     const queryUser = "SELECT * FROM users WHERE userID=?";

//     connection.query(queryUser, [userID], (err, data)=>{
//         if(err) return res.status(500).json(err);

//         const {password, ...info} = data[0];
//         //console.log(info, "INFOOOOOOOOO")
//         return res.json(info);
//     })


// }

// exports.updateUser = (req, res) => {
//     const userID = req.params.userID;
//     const updatedData = req.body;

//     // Check if a new password is provided in the request
//     if (updatedData.password) {
//         // Hash the new password before updating
//         const salt = bcrypt.genSaltSync(10);
//         updatedData.password = bcrypt.hashSync(updatedData.password, salt);
//     }

//     const queryUpdateUser = "UPDATE users SET ? WHERE userID=?";

//     connection.query(queryUpdateUser, [updatedData, userID], (err) => {
//         if (err) return res.status(500).json(err);

//         return res.status(200).json({ message: "User updated successfully" });
//     });
// };