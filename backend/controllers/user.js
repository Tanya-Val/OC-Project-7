const jwt = require('jsonwebtoken');
const { info } = require('npmlog');
const connection = require('../db.js');
const bcrypt = require('bcrypt');

exports.getUser = (req, res) => {
    //todo 1.56

    const userID = req.params.userID;
    const queryUser = "SELECT * FROM users WHERE userID=?";

    connection.query(queryUser, [userID], (err, data)=>{
        if(err) return res.status(500).json(err);

        const {password, ...info} = data[0];
        //console.log(info, "INFOOOOOOOOO")
        return res.json(info);
    })


}

exports.updateUser = (req, res) => {
    const userID = req.params.userID;
    const updatedData = req.body;

    // Check if a new password is provided in the request
    if (updatedData.password) {
        // Hash the new password before updating
        const salt = bcrypt.genSaltSync(10);
        updatedData.password = bcrypt.hashSync(updatedData.password, salt);
    }

    const queryUpdateUser = "UPDATE users SET ? WHERE userID=?";

    connection.query(queryUpdateUser, [updatedData, userID], (err) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ message: "User updated successfully" });
    });
};