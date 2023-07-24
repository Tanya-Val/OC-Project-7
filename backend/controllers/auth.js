const connection = require('../db.js');
const bcrypt = require('bcrypt');


exports.register = (req, res) => {
    // Check user in the database
    const selectQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(selectQuery, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");

        // Create new user and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const department = req.body.department;
        const email = req.body.email;

        const insertQuery = "INSERT INTO users (firstName, lastName, department, email, password) VALUES (?, ?, ?, ?, ?)";
        connection.query(insertQuery, [firstName, lastName, department, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json(err);
            }

            console.log('Query executed successfully:', result);
            res.json({
                message: 'Signup successful!'
            });
        });
    });
};


exports.login = (req, res) => {
    // ... the code for the login function
};

exports.logout = (req, res) => {
    // ... the code for the logout function
};