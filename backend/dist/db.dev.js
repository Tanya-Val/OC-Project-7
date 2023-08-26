"use strict";

var express = require('express'); //


var app = express(); //

require('dotenv').config();

var mysql = require('mysql2'); //Connection to the database


var connection = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
module.exports = connection;