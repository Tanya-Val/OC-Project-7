const express = require('express'); //
const app = express(); //

require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool({connectionLimit: 10, host: '127.0.0.1', user: 'root', password: process.env.DB_PASSWORD, database: process.env.DB_NAME});

module.exports = connection;