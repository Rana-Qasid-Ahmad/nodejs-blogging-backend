const { Pool } = require('pg');

// Database connection configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: true
};

// Create a new pool instance
const pool = new Pool(dbConfig);
pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
    console.log("Connected to database");
    release(); // Release the client back to the pool
});
// Export the pool for use in other modules
module.exports = {
    query: (text, params) => pool.query(text, params),
};
