const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "library",
    password: process.env.DB_PASSWORD || "yourpassword",
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch((err) => {
        console.error("Unable to connect to the database:", err.message);
        process.exit(1);
    });

module.exports = pool;
