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
//notes is refrencing the array of objects in db.json
let notes = require("./db/db.json");

// created route to get notes.html file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Create and post new note
app.post("/api/notes", function(req, res) {
    //create id for note so that it can be used to grab the note
    let id = Math.random();
    //create a new note that will have an id,title, and text that will hold the values passed by the user
    let newNote = {
        id: id,
        title: req.body.title,
        text: req.body.text,
    };
    //pushes the new note as an object to the array called notes
    notes.push(newNote);
    //stringifies notes 
    const stringifyNote = JSON.stringify(notes);
    res.json(notes);
    //client will treat the response string as a valid JSON object
    fs.writeFile("db/db.json", stringifyNote, (err) => {
        //sends stringified note to db
        if (err) console.log(err);
        //error handling
        else {
            console.log("Note saved");
        }
    });
});

// Display notes
app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data)
        //grab data from db 
        {
            if (err) {
                console.log(err);
                //error handling
                return;
            }
            res.json(notes);
            //client will treat the response string as a valid JSON object
        });
});

// Starts server to begin listening
app.listen(PORT, function() {
    console.log("Server Running " + `http://localhost:${PORT}`);
});