const express = require("express")    // imports
const sequelize = require("sequelize")
const dotenv = require("dotenv")

// environment definition
dotenv.config()

// initialize express application 
const app = express()

// middleware 
app.use(express.json())

//port number
const port = 3000

// database connection
const db = require('./config/dbConfig');

// define all the routes
const userRoutes = require('./routes/userRoutes'); 
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const authRoutes = require('./routes/authRoutes');

//use of routes
app.use('/api/auth', authRoutes(db)); // check here why db is passed
app.use('/api/users', userRoutes(db));   // check here why db is passed
app.use('/api/books', bookRoutes(db)); // check here why db is passed
app.use('/api/borrows', borrowRoutes(db)); // check here why db is passed


// handle undefined routes
app.use((req, res, next)=>{
    res.status(404).json({message: "Route not found"});
})

// handle errors
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).json({message: err.message});
})


app.listen(port ,()=>{
    console.log(`server is running on port ${port}`);
});


// db connection sirf intialize karna h - pass later
