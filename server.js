// require dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require('util');

// Async Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// server
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware
app.use(express.static("/public"));

// post request
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("/db/db.json", "utf-8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});