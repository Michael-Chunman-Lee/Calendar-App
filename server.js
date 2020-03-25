"use strict";
const log = console.log;

const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); 

const { User } = require("./models/user");

const { ObjectID } = require("mongodb");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    log(email, password);
    User.findByEmailPassword(email, password)
        .then(user => {
            req.session.user = user._id;
            req.session.email = user.email;
            res.send({ currentUser: user.email });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/


/** User routes below **/
app.post("/users", (req, res) => {
    log(req.body);

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

/** Calendar routes below */


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});