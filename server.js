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