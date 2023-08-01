const connection = require('../db.js');

exports.getPosts = (req, res) => {
  const postsQuery = `SELECT posts.*, users.firstName, users.lastName, users.profilePicture FROM posts JOIN users ON posts.userID = users.userID`;

  connection.query(postsQuery, (err, data) => {
    if (err) {
      console.error('Error occurred while fetching posts:', err);
      return res.status(500).json(err);
    }

    console.log('Posts fetched successfully:', data);

    return res.status(200).json(data);
  });
};
