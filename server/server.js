'use strict';

// Initializations
// Initilization of express
const express = require('express');
// Initialization of Database
const mysql = require('mysql');
// Initialization of cors
const cors = require('cors');
// Initiialization of jwt and cookie-parser for authentication purpose
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// Initialization of bycrypt, to hash passwords
const bycrypt = require('bycryptjs');
const saltRounds = 10;


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

/* database connection check, from the lecture, not urgently needed here
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
*/

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


//***API-PART BEGINS***/
// get-API to get all events from the database and sending it to the client to display it
app.get('/api/getEvents', (req, res) => {

    connection.query("SELECT * FROM `events` LIMIT 1", function (error, results, fields) {

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
    if (typeof req.body !== "undefined") {
    
    const vorname = connection.escape(req.body.vorname)
    const nachname = connection.escape(req.body.nachname)
    const email = connection.escape(req.body.email)
    console.log("Escaped req.body.vorname, nachname and email: " + connection.escape(req.body.vorname) + " " + connection.escape(req.body.nachname) + " " + connection.escape(req.body.email))

    connection.query("SELECT `user_vorname`, `user_nachname`, `user_email` FROM `user` WHERE `user_vorname` = " + vorname + "AND `user_nachname` = " + nachname + "OR `user_email` = " + email + ";", function(error, res_duplikatPruefung, fields){
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            if (res_duplikatPruefung.length == 0){
                console.log("MariaDB found no duplicates of the name and email => the name and email can be used together!")

                var vorname = connection.escape(req.body.vorname);
                var nachname = connection.escape(req.body.nachname);
                var email = connection.escape(req.body.email);
                var passwort = req.body.passwort;

                console.log("Client wants to send DB insert request with vorname: " + vorname + " ; nachname: " + nachname + " ; email: " + email)

                bycrypt.genSalt(saltRounds, function(err, salt){
                    bycrypt.hash(passwort, salt, function(err, hash){
                        connection.query("INSERT INTO `user` (`user_id`, `user_vorname`, `user_nachname`, `user_email`, `user_passwort`) VALUES (NULL, '" + vorname + "', '" + nachname + "', '" + email + "', '" + hash, function (error, results, fields){
                            if (error){
                                console.error(error);
                                res.status(500).json(error);
                            } else {
                                console.log("Account entry successfully created!")
                            }
                        })
                        
                    })
                })
            } else {
                if (res_duplikatPruefung > 0){
                    console.log("Found duplicate! Vorname in DB = " + res_duplikatPruefung[0].user_vorname + ", Vorname from client = " + req.body.vorname)
                    console.log("Nachname in DB = " + res_duplikatPruefung[0].user_nachname + ", Nachname from client = " + req.body.nachname)
                    console.log("Email in DB = " + res_duplikatPruefung[0].user_email + ", Email from Client = " + req.body.vorname)

                    if (res_duplikatPruefung[0].user_email == req.body.email){
                        console.log("Email already taken!")
                        res.status(400).json({ message: "Email '" + req.body.email + "' schon vorhanden!" });
                    } else if (res_duplikatPruefung[0].user_vorname == req.body.vorname){
                        console.log("Vorname already taken!")
                        res.status(400).json({ message: "Vorname '" + req.body.vorname + "' schon vorhanden!" });
                    }
                } else {
                    console.error("Client sent no correct data!")
                    res.status(400).json({ message: 'Client hat keine korrekten Daten gesendet!' });
                }
            }
        }
    });
    }
});


//post-API for checking, if there is a user with the correct data, which was typed in on anmeldung.component, and if so, he/she will be logged in
app.post('/api/anmeldung', (req, res) => {

console.log("Client sent following mail adress: " + req.body.email);
console.log("Escaped req.body.email: " + connection.escape(req.body.email))
const email = connection.escape(req.body.email)
var pw_correct = false;

connection.query("SELECT `user_id`,`user_email`,`user_passwort` FROM `user` WHERE `user_email` = '" + email + "';", function (error, res_email, fields) {

    if (error) {
        console.error(error);
        res.status(500).json(error);
    } else {
        if (res_email.length == 0) {
            console.log("res_email.length = " + res_email.length)
            console.log("No account found for sent email.")
            res.status(400).json({ message: "Es konnte kein Account mit dieser E-Mail-Adresse gefunden werden!"});
        }

        else {
            if (res_email.length > 0) {
                console.log("res_email.length = " + res_email.length)
                console.log("The entered mail was found in the database.")
                console.log("Email in DB = " + res_email[0].user_email)

               bycrypt.compare(req.body.passwort, res_email[0].passwort, function (err, compare_result){
                    console.log("compare_result of password check = " + compare_result)
                    pw_correct = compare_result;

                    if (pw_correct == true) {
                        const user = res_email[0];
                        const token = jwt.sign(
                            { id: user.user_id, email: user.user_email},
                            secretKey,
                            { expiresIn: '3h'}
                        );

                        res.cookie('jwt', token, {httpOnly: true, secure: true, sameSite:"strict"});
                        res.status(200).json({token: token, message: "Login erfolgreich!"})
                    }
                    if (pw_correct == false) {
                        res.status(400).json({ message: "Falsches Passwort oder falsche E-Mail!"})
                    }
                })
            }
        }
    }
});
});

//...

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


//get-API to see, which user is participating on the event
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


//delete-API to delete a user from an event, after he/her clicked a button to cancel his/her participation
app.delete('/database/:id', (req, res) => {
    // This path will delete an entry. For example the path would look like DELETE '/database/5' -> This will delete number 5
    let id = req.params.id; // <- load the ID from the path
    console.log("Request to delete Item: " + id); // <- log for debugging

    // Actual executing the query to delete it from the server
    // Please keep in mind to secure this for SQL injection!
    connection.query("DELETE FROM `eventmanagement` WHERE `eventmanagement`.`teilnehmer_id` = " + id + ";", function (error, results, fields) {
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
});


//post-API for posting a user which is participating on an certain event, after he/her clicked a button accept an event
app.post('/api/participation', (req, res) => {

    if (typeof req.body !== "undefined" && typeof req.body.eventtitel !== "undefined" && typeof req.body.veranstalter !== "undefined" && typeof req.body.typ !== "undefined" 
    && typeof req.body.kategorie !== "undefined" && typeof req.body.adresse !== "undefined" && typeof req.body.stadt !== "undefined" && typeof req.body.bundesland !== "undefined"
    && typeof req.body.plz !== "undefined" && typeof req.body.land !== "undefined" && typeof req.body.startdatum !== "undefined" && typeof req.body.enddatum !== "undefined" 
    && typeof req.body.startzeit !== "undefined" && typeof req.body.endzeit !== "undefined") {
        
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
        console.log("Client send database insert request with 'eventtitel': " + eventtitel + " ; veranstalter: " + veranstalter);
        
        connection.query("INSERT INTO `events` (`event_id`, `event_titel`, `event_veranstalter`, `event_typ`, `event_kategorie`, `event_adresse`, `event_stadt`,`event_bundesland`, `event_plz`, `event_land`, `event_startdatum`, `event_enddatum`, `event_startzeit`, `event_endzeit`, `event_erstellt`) VALUES (NULL, '" + eventtitel + "', '" + veranstalter + "', '" + typ + "', '" + kategorie + "', '" + adresse + "', '" + stadt + "', '" + bundesland + "', '" + plz + "', '" + land + "', '" + startdatum + "', '" + enddatum + "', '" + startzeit + "', '" + endzeit + "' current_timestamp());", function (error, results, fields) {
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


//delete-API for deleting an event from the database
app.delete('/database/:id', (req, res) => {
    // This path will delete an entry. For example the path would look like DELETE '/database/5' -> This will delete number 5
    let id = req.params.id; // <- load the ID from the path
    console.log("Request to delete Item: " + id); // <- log for debugging

    // Actual executing the query to delete it from the server
    // Please keep in mind to secure this for SQL injection!
    connection.query("DELETE FROM `events` WHERE `events`.`task_id` = " + id + ";", function (error, results, fields) {
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









