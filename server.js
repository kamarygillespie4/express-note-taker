//Require express and store it in a variable called express
//require other dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//create instance of express
let app = express();
// Set up Express app to listen on port from deployed server and if it is not being deployed, PORT 3000
let PORT = process.env.PORT || 3000;

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//middleware to serve static file in public directory 
app.use(express.static("public"));
//create db where the notes will be stored and refrenced
let notes = require("./db/db.json");


// Starts server to begin listening
app.listen(PORT, function() {
    console.log("Server Running " + `http://localhost:${PORT}`);
});