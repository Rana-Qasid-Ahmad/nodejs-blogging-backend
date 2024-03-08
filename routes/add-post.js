
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Please Login Frist" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = decoded;
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not a admin" });
    }
    next();
  });
}

// POST endpoint to insert a new post
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { title, content, author_id, feature_image, category} = req.body;

    // Ensure required fields are provided
    if (!title || !content || !author_id || !feature_image || !category) {
      return res
        .status(400)
        .json({ message: "Title, Content, and Image are required fields" });
    }

    // Insert the post into the database
    const queryText =
      "INSERT INTO blog_posts (title, content, author_id, feature_image, category) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [title, content, author_id, feature_image, category];

    const result = await pool.query(queryText, values);
    const AddPost = result.rows[0];

    res
      .status(201)
      .json({
        message: "Post Added successfully",
        Post: AddPost,
      });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
