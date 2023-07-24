const connection = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


exports.register = (req, res) => {
    // Check user in the database
    const selectQuery = "SELECT * FROM users WHERE email = ?";
    
    
    connection.query(selectQuery, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");

        // Create new user and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        console.log('req.body.password:', req.body.password);
        console.log('salt:', salt);

    
        const insertQuery = "INSERT INTO users (firstName, lastName, department, email, password) VALUES (?)";


        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.department,
            req.body.email,
            hashedPassword
        ];

        connection.query(insertQuery, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
          });
    });

    console.log('req.body:', req.body);

};


exports.login = (req, res) => {
    // Check if user exists in the database
    const selectQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(selectQuery, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        // Check if password is correct
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json("Wrong password or email!");

        // User is authenticated, create access token
        const token = jwt.sign({
            id: data[0].userID
        }, "secretkey");

        // User is authenticated, send user data
        const {
            password,
            ...others
        } = data[0];

        res.cookie('accessToken', token, {
            httpOnly: true,
        })
        res.status(200).json(others);
    });
};



exports.logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
};