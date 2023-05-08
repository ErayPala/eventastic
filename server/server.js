'use strict';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');

// Database connection info - used from environment variables
var dbInfo = {
    connectionLimit : 10,
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

var connection = mysql.createPool(dbInfo);
console.log("Conecting to database...");

// Check the connection
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error; // <- this will throw the error and exit normally
    // check the solution - should be 2
    if (results[0].solution == 2) {
        // everything is fine with the database
        console.log("Database connected and works");
    } else {
        // connection is not fine - please check
        console.error("There is something wrong with your database connection! Please check");
        process.exit(5); // <- exit application with error code e.g. 5
    }
});

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Features for JSON Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization'
};

app.use(cors(corsOptions));


app.get('/api/test', (req, res) => {

    connection.query("SELECT * FROM `events`", function (error, results, fields) {

        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});


app.post('/api/erstellen', (req, res) => {

    console.log('Erfolgreiche Server-Connection'); // <- log results in console

    // This will add a new row. So we're getting a JSON from the webbrowser which needs to be checked for correctness and later
    // it will be added to the database with a query.
    if (typeof req.body !== "undefined" && typeof req.body.eventtitel !== "undefined" && typeof req.body.veranstalter !== "undefined" && typeof req.body.typ !== "undefined" 
    && typeof req.body.kategorie !== "undefined" && typeof req.body.adresse !== "undefined" && typeof req.body.stadt !== "undefined" && typeof req.body.bundesland !== "undefined"
    && typeof req.body.plz !== "undefined" && typeof req.body.land !== "undefined" && typeof req.body.startdatum !== "undefined" && typeof req.body.enddatum !== "undefined" 
    && typeof req.body.startzeit !== "undefined" && typeof req.body.endzeit !== "undefined") {
        // The content looks good, so move on
        // Get the content to local variables:
        var eventtitel = req.body.eventtitel;
        var veranstalter = req.body.veranstalter;
        var typ = req.body.typ;
        var kategorie = req.body.kategorie;
        var adresse = req.body.adresse;
        var stadt = req.body.stadt;
        var bundesland = req.body.bundesland;
        var plz = req.body.plz;
        var land = req.body.land;
        var startdatum = req.body.eventbeginn;
        var enddatum = req.body.eventende;
        var startzeit = req.body.startzeit;
        var endzeit = req.body.uhrzeit;
        console.log("Client send database insert request with 'eventtitel': " + eventtitel + " ; veranstalter: " + veranstalter); // <- log to server
        // Actual executing the query. Please keep in mind that this is for learning and education.
        // In real production environment, this has to be secure for SQL injection!
        connection.query("INSERT INTO `events` (`event_id`, `event_titel`, `event_veranstalter`, `event_typ`, `event_kategorie`, `event_adresse`, `event_stadt`,`event_bundesland`, `event_plz`, `event_land`, `event_startdatum`, `event_enddatum`, `event_startzeit`, `event_endzeit`, `event_erstellt`) VALUES (NULL, '" + eventtitel + "', '" + veranstalter + "', '" + typ + "', '" + kategorie + "', '" + adresse + "', '" + stadt + "', '" + bundesland + "', '" + plz + "', '" + land + "', '" + startdatum + "', '" + enddatum + "', '" + startzeit + "', '" + endzeit + "' current_timestamp());", function (error, results, fields) {
            if (error) {
                // we got an errror - inform the client
                console.error(error); // <- log error in server
                res.status(500).json(error); // <- send to client
            } else {
                // Everything is fine with the query
                console.log('Success answer: ', results); // <- log results in console
                // INFO: Here can be some checks of modification of the result
                res.status(200).json(results); // <- send it to client
            }
        });
    }
    else {
        // There is nobody with a title nor description
        console.error("Client send no correct data!")
        // Set HTTP Status -> 400 is client error -> and send message
        res.status(400).json({ message: 'This function requries a body with "title" and "description' });
    }
});

// Start the actual server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start database connection
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}









