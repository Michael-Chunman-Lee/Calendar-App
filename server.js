"use strict";
const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); 

const { User } = require("./models/user");

const { Post } = require("./models/post")

const { ObjectID } = require("mongodb");

const { parseEventsFromICS } = require("./icsHelpers")
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
    const username = req.body.username;
    const password = req.body.password;

    User.findByUsernamePassword(username, password)
        .then(user => {
            req.session.userID = user._id;
            req.session.username = user.username;
            req.session.isAdmin = user.isAdmin;
            res.send({ currentUser: user.username, isAdmin: user.isAdmin, userID: user._id });
        })
        .catch(error => {
            res.status(400).send(error)
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
        res.send({ currentUser: req.session.username, isAdmin: req.session.isAdmin, userID: req.session.userID });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/


/** User routes below **/
app.post("/users", (req, res) => {

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: false
    });

    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.statusMessage = "Username or email already taken!"
            res.status(400).send(error); // 400 for bad request
        }
    );
});

app.patch("/users/:username", (req, res) => {
    const username = req.params.username
    const password = req.body.oldPassword
    const newPassword = req.body.newPassword
    User.findByUsernamePassword(username, password).then(user => {
        user.password = newPassword
        user.save().then(user => {
            res.json(user)
        }, error => {
            res.status(400).send(error)
        })
    }).catch(error => {
        res.status(400).send(error)
    })
})

// WILL NEED TO CHECK IF ADMIN
app.delete("/users/:username", (req, res) => { 
    const username = req.params.username;
    
    User.findOneAndRemove({ username: username }).then(user => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(student)
        }
    }).catch(error => {
        res.status(400).send(error)
    })
})

/** Post routes below */
app.post("/posts", (req, res) => {
    const post = new Post({
        name: req.body.user,
        tag: req.body.tag,
        title: req.body.title,
        viewCount: 0,
        date: new Date(),
        events: parseEventsFromICS(req.body.icsRawText)
    });

    post.save().then(
        post => {
            res.send(post);
        },
        error => {
            res.statusMessage = "Failed to create post"
            res.status(400).send(error); // 400 for bad request
        }
    );
})

/** Post Routes */
app.patch("/posts/increment/:id", (req, res) =>{
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

    Post.findOne({ _id: id }).then( post =>{
        if (!post){
            res.status(404).send()
        }else{
            post.viewCount++
            post.save().then(result =>{
				res.send(result)
			}, err => {
				res.status(400).send(err)
			})
        }
    }).catch(err => {
        res.status(400).send(err)
    })

})
app.patch("/posts/add-rating/:id", (req, res) =>{
    const id = req.params.id
    const {username,  additionalComment, criteriaLabels, criteriaRatings} = req.body
    const body = {username,  additionalComment, criteriaLabels, criteriaRatings}
    if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	Post.findByIdAndUpdate(id, {$addToSet: {ratings: body}}, {new: true}).then((result) => {
		if (!result) {
			res.status(404).send()
		} else {   
			res.send(result)
		}
	}).catch((err) => {
		res.status(400).send(err)
	})
})

/** Calendar routes below */

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});