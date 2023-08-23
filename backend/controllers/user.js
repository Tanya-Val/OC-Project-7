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