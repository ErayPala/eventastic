'use strict';

// Initializations
// Initilization of express
const express = require('express');
// Initialization of Database
const mysql = require('mysql');
// Initialization of cors
const cors = require('cors');
// Initiialization of jwt
const jwt = require('jsonwebtoken');

//Here could be the possibility to implement a cookie-parser
// const cookieParser = require('cookie-parser');

// Initialization of bycrypt to hash passwords, if needed (is not implemented unfortunately)
// const bycrypt = require('bcryptjs');
// const saltRounds = 10;


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

// database connection check, from the lecture, not urgently needed here
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

// Constants for server connection
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Features for JSON Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cors settings
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization'
};
app.use(cors(corsOptions));

//Initialization a JWT secret key
const secretKey = 'secret-key';

//Feature to parse cookies (JWT) (is not implemented)
// app.use(cookieParser);


//***API-PART BEGINS***/
// get-API to get all events from the database and sending it to the client to display it
app.get('/api/getEvents', (req, res) => {

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


//post-API for posting the input from the registrieren.component into the database to register a new user
app.post('/api/registrierung', (req, res) => {
    if (typeof req.body !== "undefined" && typeof req.body.vorname !== "undefined" && typeof req.body.nachname !== "undefined" && typeof req.body.email !== "undefined" 
    && typeof req.body.password !== "undefined") {
        
        //...A check for the correct e-mail standard should actually have been implemented here...

        var vorname = req.body.vorname;
        var nachname = req.body.nachname;
        var email = req.body.email;
        var password = req.body.password;

        //And here we think should have been checked, if the password was typed in correctly...
        //And here we think should have been bycrypt be implemented...
    
        console.log("Client send database insert request with 'eventtitel': ; veranstalter: ");
        
        connection.query("INSERT INTO `user` (`user_id`, `user_vorname`, `user_nachname`, `user_email`, `user_passwort`) VALUES (NULL, '" + vorname + "', '" + nachname + "', '" + email + "', '" + password + "');", function (error, results, fields) {
            if (error) {
                console.error(error);
                res.status(500).json(error);
            } else {
                console.log('Success answer: ', results);
                res.status(200).json(results);
            }
        });
    }
    else {
        console.error("Client send no correct data!")
        res.status(400).json({ message: 'Alle Felder müssen korrekt ausgefüllt werden!' });
    }
});

app.post('/api/anmeldung', (req, res) => {

    console.log("Client sent following mail adress: " + req.body.email);
    
    connection.query("SELECT `user_id`,`user_email`,`user_passwort` FROM `user` WHERE `user_email` = '" + req.body.email + "';", function (error, res_email, fields) {
    
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            if (res_email.length == 0) {
                console.log("res_email.length = " + res_email.length)
                console.log("Kein Account zur Email gefunden.")
                res.status(400).json({ message: "Es konnte kein Account mit dieser E-Mail-Adresse gefunden werden!"});
            }
    
            else {
                if (res_email.length > 0) {
                    console.log("res_email.length = " + res_email.length)
                    console.log("Die eingegebene Mial wurde in der Datenbank gefunden.")
                    console.log("Email in DB = " + res_email[0].user_email)
                    if (req.body.password == res_email[0].user_passwort) {
                        const user = res_email[0];
                        const token = jwt.sign(
                            { id: user.user_id, email: user.user_email},
                            secretKey,
                            { expiresIn: '3h'}
                        );
    
                            res.status(200).json({token: token, message: "Login erfolgreich!"});
                    } else {
                        res.status(400).json({ message: "Falsches Passwort oder falsche E-Mail!"})
                    }
                }
            }
        }
    });
    });

//get-API to log out the user
app.get('/api/abmeldung', function(req, res){
    res.clearCookie('jwt', {maxAge:0});
    res.json({ message: 'Ablmeldung erfolgreich.'});
})

//post-API for posting the input data from the erstellen.component into the database
app.post('/api/erstellen', (req, res) => {

    if (typeof req.body !== "undefined") {
       
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
        var endzeit = req.body.endzeit;
        
        console.log("Client send database insert request with 'eventtitel':"); 

        connection.query("INSERT INTO `events` (`event_id`, `event_titel`, `event_veranstalter`, `event_typ`, `event_kategorie`, `event_adresse`, `event_stadt`,`event_bundesland`, `event_plz`, `event_land`, `event_startdatum`, `event_enddatum`, `event_startzeit`, `event_endzeit`, `event_erstellt`) VALUES (NULL, '" + eventtitel + "', '" + veranstalter + "', '" + typ + "', '" + kategorie + "', '" + adresse + "', '" + stadt + "', '" + bundesland + "', '" + plz + "', '" + land + "', '" + startdatum + "', '" + enddatum + "', '" + startzeit + "', '" + endzeit + "', current_timestamp());", function (error, results, fields) {
            if (error) {
                console.error(error);
                res.status(500).json(error);
            } else {
                console.log('Success answer: ', results);
                res.status(200).json(results);
            }
        });
    }
    else {
        console.error("Client send no correct data!")
        res.status(400).json({ message: 'This function requries a body with "title" and "description' });
    }
});


//get-API to see, which user is participating on the event (is not implemented unfortunately...)
app.get('/api/teilnehmer', (req, res) => {

    connection.query("SELECT `teilnehmer_id`,`user_id`,`event_id`, FROM `eventmanagement`", function (error, results, fields) {
    
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});


//delete-API to delete a user from an event, after he/her clicked a button to cancel his/her participation (is not implemented unfortunately...)
app.delete('/api/teilnehmerLöschen', (req, res) => {

    let id = req.params.id;
    console.log("Request to delete Item: " + id);

    connection.query("DELETE FROM `eventmanagement` WHERE `eventmanagement`.`teilnehmer_id` = " + id + ";", function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer: ', results);
            res.status(200).json(results);
        }
    });
});


//post-API for posting a user which is participating on an certain event, after he/her clicked a button to accept an event (is not implemented unfortunately...)
app.post('/api/teilnahme', (req, res) => {
//...
});


//delete-API for deleting an event from the database
app.delete('/api/eventLöschen', (req, res) => {
   
    let id = req.event.id;
    console.log("Request to delete an event: " + id);

    connection.query("DELETE FROM `events` WHERE `events`.`event_id` = " + id + ";", function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer: ', results);
            res.status(200).json(results);
        }
    });
});


//Optional: Gooogle Maps API for showing, where the event is going to take place
//Here we have to admit, that this was very difficult for us to implement...
//***API-PART ENDS***/



// Start the actual server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start database connection
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}