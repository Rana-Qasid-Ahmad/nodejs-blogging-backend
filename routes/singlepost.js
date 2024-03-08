const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const jwt = require('jsonwebtoken');

// Route to open a post by its ID
router.get("/:postID", async (req, res) => {
  try {
    const postID = req.params.postID; // Extracting post ID from request parameters
    console.log(postID);
    const query = "SELECT * FROM blog_posts WHERE post_id = $1";
    const result = await pool.query(query, [postID]);
    

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = result.rows[0];
    res.json({ post });
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Route to update a post by its ID
router.put("/:postID", async (req, res) => {
  try {
    const token = req.headers.authorization; // Extract JWT token from the request headers

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Check if the user's role contains 'admin'
      if (!decoded || !decoded.role || !decoded.role.includes('admin')) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const postID = req.params.postID; // Extracting post ID from request parameters
      const { title, content, author_id, feature_image, category } = req.body; // Extracting fields from request body

      // Initialize arrays to hold the SET clauses and parameters for the SQL query
      let setClauses = [];
      let parameters = [];

      // Add SET clauses and parameters only for fields that are provided in the request body
      if (title) {
        setClauses.push(`title = $${parameters.length + 1}`);
        parameters.push(title);
      }
      if (content) {
        setClauses.push(`content = $${parameters.length + 1}`);
        parameters.push(content);
      }
      if (author_id) {
        setClauses.push(`author_id = $${parameters.length + 1}`);
        parameters.push(author_id);
      }
      if (feature_image) {
        setClauses.push(`feature_image = $${parameters.length + 1}`);
        parameters.push(feature_image);
      }
      if (category) {
        setClauses.push(`category = $${parameters.length + 1}`);
        parameters.push(category);
      }

      // Constructing the SQL query to update the post
      const query = `
        UPDATE blog_posts 
        SET ${setClauses.join(', ')}
        WHERE id = $${parameters.length + 1}
      `;

      // Add the postId parameter for the WHERE clause
      parameters.push(postID);

      // Executing the SQL query with the parameters
      const result = await pool.query(query, parameters);

      res.json({ message: "post updated successfully" });
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
