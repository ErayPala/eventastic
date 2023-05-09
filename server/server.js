'use strict';

// Initialization of express components
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
const cors = require('cors');

// Database connection info - used from environment variables
var dbInfo = {
    connectionLimit : 10,
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

var connection = mysql.createPool(dbInfo);
const sessionStore = new MySQLStore({}, conn);
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

// Session-Konfiguration
app.use(session({
    secret: 'geheimes_geheimnis',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
    }));

// JWT-Konfiguration
const jwtSecret = 'geheimes_jwt_geheimnis';   

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization'
};

app.use(cors(corsOptions));

// Just an get-API for testing
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

//post-API for posting the input from the registrieren.component into the database to register a new user
app.post('/api/registrieren', (req, res) => {

if (typeof req.body !== "undefined" && typeof req.body.vorname !== "undefined" && typeof req.body.nachname !== "undefined" && typeof req.body.email !== "undefined" 
&& typeof req.body.password !== "undefined" && typeof req.body.adresse !== "undefined") {
    
    //I think here must be checked, if the email-standard was typed in correctly...

    var vorname = req.body.vorname;
    var nachname = req.body.nachname;
    var email = req.body.email;
    var password = req.body.password;

    //And here we think must be checked, if the password was typed in correctly...
    //And here we think must be some kind of technology like bycrypt or jwt be implemented...
   
    console.log("Client send database insert request with 'eventtitel': " + eventtitel + " ; veranstalter: " + veranstalter);
    
    connection.query("INSERT INTO `events` (`user_id`, `user_vorname`, `user_nachname`, `user_email`, `user_passwort`) VALUES (NULL, '" + vorname + "', '" + nachname + "', '" + email + "', '" + password + "');", function (error, results, fields) {
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


/*
// Login-Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Überprüfung der Benutzerdaten in der Datenbank
    const user = { id: 1, username: 'testuser' };
    if (!user || password !== 'geheimes_password') {
    return res.status(401).json({ message: 'Falscher Benutzername oder Passwort' });
    }
    // Erstellung und Signierung des JWT-Tokens
    const token = jwt.sign({ sub: user.id, username: user.username }, jwtSecret);
    // Speichern des Anmeldestatus in der MySQL-Sitzung
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    // Setzen des JWT-Tokens als Cookie
    res.cookie('token', token, { httpOnly: true });
    // Rückgabe einer Bestätigung als JSON-Antwort
    return res.json({ message: 'Anmeldung erfolgreich' });
    });
    
// Geschützte Route
app.get('/protected', (req, res) => {
// Überprüfung des JWT-Tokens im Cookie
const token = req.cookies.token;
if (!token) {
return res.status(401).json({ message: 'Kein Token bereitgestellt' });
}
let decodedToken;
try {
decodedToken = jwt.verify(token, jwtSecret);
} catch (err) {
return res.status(401).json({ message: 'Ungültiges Token' });
}
// Überprüfung des Anmeldestatus in der MySQL-Sitzung
if (!req.session.isLoggedIn || req.session.userId !== decodedToken.sub) {
return res.status(401).json({ message: 'Nicht authentifiziert' });
}
// Rückgabe der geschützten Daten als JSON-Antwort
return res.json({ data: 'Diese Daten sind geschützt' });
});

// Logout-Route
app.post('/logout', (req, res) => {
// Löschen der Anmeldedaten aus der MySQL-Sitzung
req.session.isLoggedIn = false;
req.session.userId = null;
// Löschen des JWT-Cookies
res.clearCookie('token');
// Rückgabe einer Bestätigung als JSON-Antwort
return res.json({ message: 'Logout erfolgreich' });
});
*/


//post-API for checking, if there is a user with the correct data, which was typed in on anmeldung.component, and if so, he/she will be logged in
app.post('/api/anmeldung', (req, res) => {

console.log("Client sent following mail adress: " + req.body.email);
var pw_correct = false;

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
                console.log("Email in DB = " + res_email[0].email)

                bycrypt.compare(req.body.passwort, res_email[0].passwort, function (err, compare_result){
                    console.log("res_email[0].passwort = " + res_email[0].passwort)
                    console.log("Eingegebenes Passwort = " + req.body.passwort)
                    console.log("compare_result = " + compare_result)
                    pw_correct = compare_result;

                    if (pw_correct == true) {
                        const user = res_email[0];
                        const token = jwt.sign(
                            { id: user.user_id, email: user.user_email},
                            secretKey,
                            { expiresIn: '3h'}
                        );

                        res.cookie('jwt', token, {httpOnly: true});
                        res.status(200).json("Login erfolgreich!");
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


//post-API for posting a user which is participating on an certain event, after he/her clicked a button accept an event
app.post('/api/erstellen', (req, res) => {

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
                // we got an error - inform the client
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


//post-API for posting the input data from the erstellen.component into the database
app.post('/api/erstellen', (req, res) => {

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

// Start the actual server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start database connection
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}









