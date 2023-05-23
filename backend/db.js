require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async function updateOrCreateTables() {
  try {
    const pool = await connection.getConnection();
    console.log('Successfully connected to MySQL.');

    // Check if the database exists
    const [databaseRows] = await pool.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
    if (databaseRows.length === 0) {
      console.error(`Database "${process.env.DB_NAME}" does not exist.`);
      return;
    }

    // Create or update "users" table
    const [usersRows] = await pool.query('SHOW TABLES LIKE "users"');
    if (usersRows.length === 0) {
      console.log('Creating users table...');
      await pool.query(`
      CREATE TABLE users (
        userID INT NOT NULL AUTO_INCREMENT,
        firstName VARCHAR(60) NOT NULL,
        lastName VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL,
        password VARCHAR(60) NOT NULL,
        department VARCHAR(500) DEFAULT NULL,
        profilePicture LONGBLOB,
        PRIMARY KEY (userID),
        UNIQUE KEY email_UNIQUE (email)
      )
      `);
    } else {
      console.log('Users table already exists.');
    }

    // Create or update "posts" table
    const [postsRows] = await pool.query('SHOW TABLES LIKE "posts"');
    if (postsRows.length === 0) {
      console.log('Creating posts table...');
      await pool.query(`
        CREATE TABLE posts (
          postID INT NOT NULL AUTO_INCREMENT,
          userID INT NOT NULL,
          firstName VARCHAR(60) NOT NULL,
          lastName VARCHAR(60) NOT NULL,
          media LONGBLOB,
          title VARCHAR(45) NOT NULL,
          created_date DATETIME NOT NULL,
          updated_date DATETIME NOT NULL,
          readBy VARCHAR(45) NOT NULL,
          PRIMARY KEY (postID),
          KEY userID_idx (userID),
          CONSTRAINT userID FOREIGN KEY (userID) REFERENCES users (userID)
        )
      `);
    } else {
      console.log('Posts table already exists.');
    }

    // Create or update "comments" table
    const [commentsRows] = await pool.query('SHOW TABLES LIKE "comments"');
    if (commentsRows.length === 0) {
      console.log('Creating comments table...');
      await pool.query(`
        CREATE TABLE comments (
          commentID INT NOT NULL AUTO_INCREMENT,
          postID INT NOT NULL,
          userID INT NOT NULL,
          firstName VARCHAR(60) NOT NULL,
          lastName VARCHAR(60) NOT NULL,
          comment VARCHAR(1000) NOT NULL,
          created_date DATETIME NOT NULL,
          modified_date DATETIME NOT NULL,
          PRIMARY KEY (commentID),
          UNIQUE KEY commentID_UNIQUE (commentID),
          UNIQUE KEY postID_UNIQUE (postID),
          UNIQUE KEY userID_UNIQUE (userID),
          CONSTRAINT fk_comments_posts FOREIGN KEY (postID) REFERENCES posts (postID),
          CONSTRAINT fk_comments_users FOREIGN KEY (userID) REFERENCES users (userID)
        )
      `);
    } else {
      console.log('Comments table already exists.');
    }

    console.log('Tables "users", "posts", and "comments" updated or created successfully.');
    pool.release();
  } catch (error) {
    console.error('Error updating or creating tables:', error);
  } finally {
    connection.end();
  }
})();

module.exports = connection;
