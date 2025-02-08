const mysql = require('mysql2');    // use sql/promise here
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'database',
});

db.connect((err)=>{
    if(err){
        console.log('Unable to connect to the database', err.message);
        process.exit(1);
    }
    console.log('Connected to the database');
});


module.exports = db;