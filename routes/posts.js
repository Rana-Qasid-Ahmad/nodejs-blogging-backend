const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const pageSize = parseInt(req.query.pageSize || 10);
    let query = "SELECT * FROM blog_posts WHERE 1 = 1";
    let queryParams = [];

    if (req.query.q && req.query.q.trim() !== "") {
      const searchQuery = req.query.q.trim();
      query += " AND (title ILIKE $1 OR content ILIKE $1)";
      queryParams.push(`%${searchQuery}%`);
    }

    // Add filtering by category
    if (req.query.category && req.query.category.trim() !== "") {
      const categoryQuery = req.query.category.trim();
      query += " AND category ILIKE $" + (queryParams.length + 1);
      queryParams.push(categoryQuery); // Push the category without % for exact matching
    }




    // Sorting
    let sortBy = 'post_id'; // Default sorting by post_id
    let sortOrder = 'ASC'; // Default sorting order
    if (req.query.sort && ['post_id', 'title', 'category', 'created_at'].includes(req.query.sort)) {
      sortBy = req.query.sort;
      sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
    }
    query += ` ORDER BY ${sortBy} ${sortOrder}`;

    const countResult = await pool.query("SELECT COUNT(*) FROM blog_posts WHERE 1 = 1");
    const totalCount = parseInt(countResult.rows[0].count);

    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;

    query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(pageSize, offset);

    const result = await pool.query(query, queryParams);
    const posts = result.rows;

    res.json({ posts, pageSize, page, totalPages });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;
