// Packages setup
const express = require("express");
const app = express();
const request = require("request");

// Sets up so you don't need .ejs
app.set("view engine", "ejs");

// Routes Section
app.get("/", function(req, res) {
    res.render("home");
});

// Add this to the end of the url in order to work - http://www.omdbapi.com/?apikey=thewdb&
app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = "http://omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

//End Rountes Section

// Start server settings
app.listen(3001, function() {
    console.log("Server Started on webdev:3001");
});