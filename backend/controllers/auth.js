// Import necessary modules
const connection = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Function to handle user registration
exports.register = (req, res) => {
    
    // SQL query to check if the user with the provided email already exists
    const selectQuery = "SELECT * FROM users WHERE email = ?";

    // Execute the select query
    connection.query(selectQuery, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        
        // If a user with the email already exists, return a conflict status
        if (data.length) return res.status(409).json("User already exists");

        // Generate a salt and hash the user's password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        
        //console.log('req.body.password:', req.body.password);
        //console.log('salt:', salt);

        // SQL query to insert a new user into the database
        const insertQuery = "INSERT INTO users (firstName, lastName, department, email, password) VALUES (?)";

        // Values to be inserted into the database
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.department,
            req.body.email,
            hashedPassword
        ];

        // Execute the insert query to create a new user
        connection.query(insertQuery, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};

// Function to handle user login
exports.login = (req, res) => {
    
    // SQL query to select a user by their email
    const selectQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(selectQuery, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        
        // If no user with the email is found, return a not found status
        if (data.length === 0) {
            // Add an error response with a meaningful message
            return res.status(404).json({ error: "Invalid email or password." });
        }

        // Check if the provided password matches the stored hashed password
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) {
            // Add an error response with a meaningful message
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Create a JWT token for the user
        const token = jwt.sign({
            id: data[0].userID
        }, "secretkey");

        // Remove the password field from the user data
        const {
            password,
            ...others
        } = data[0];

        // Set a secure HTTP-only cookie with the access token
        res.cookie('accessToken', token, {
            httpOnly: true,
        });

        // Return the user data without the password
        res.status(200).json(others);
    });
};


// Function to handle user logout
exports.logout = (req, res) => {
    // Clear the access token cookie and respond with a successful logout status
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.");
};
