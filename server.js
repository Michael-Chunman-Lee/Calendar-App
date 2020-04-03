"use strict";
const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); 

const { User } = require("./models/user");

const { Post } = require("./models/post")

const { Image } = require("./models/image")

const { ObjectID } = require("mongodb");

const { parseEventsFromICS } = require("./icsHelpers")
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: "dwhjaxqzl",
    api_key: "158346197952723",
    api_secret: "KjoKyD8vQGmkVC4EhyiPjOxQ0OE"
})

/*** Session handling **************************************/
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

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
    if (req.session.username) {
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
app.delete("/users/:id", (req, res) => { 
    const id = req.params.id;
    
    User.findByIdAndDelete(id).then(user => {
        if (!user) {
            console.log("404")
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
})

/** Post routes below */
app.get('/users', (req, res) => {
	User.find().then(users => {
		res.send({users})
	}, err => {
		res.status(500).send(err)
	})
})


/** Post routes below */
app.get('/posts', (req, res) => {
	Post.find().then(posts => {
		res.send({posts})
	}, err => {
		res.status(500).send(err)
	})
})

app.get('/posts/id/:id', (req, res) => {
    const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	Post.findOne({_id: id}).then(post => {
		if (!post) {
			res.status(404).send() 
		} else {
			res.send(post)
		}
	}).catch((err) => {
		res.status(500).send(err)
	})
})

app.post("/posts", (req, res) => {
    const post = new Post({
        username: req.body.username,
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
app.post("/posts/add-rating/:id", (req, res) =>{
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

app.get("/posts/username/:username", (req, res) => {
    const username = req.params.username
    Post.find({username: username}).then(posts => {
		res.send({posts})
	}, err => {
		res.status(500).send(err)
	})
})

app.delete("/posts/delete-rating/:id", (req, res) => {
    const id = req.params.id
    const userid = req.body.userid
    const {_id, username,  additionalComment, criteriaLabels, criteriaRatings} = req.body.rating
    const body = {_id, username,  additionalComment, criteriaLabels, criteriaRatings}
    
    
    
    if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}
    
    User.findById(userid).then(user => {
        if (user.isAdmin) {
            Post.findByIdAndUpdate(id, {$pull: {ratings: body}}, {new: true}).then((result) => {
                if (!result) {
                    res.status(404).send()
                } else {   
                    res.send(result)
                }
            }).catch((err) => {
                res.status(400).send(err)
            })
        } else {
            res.status(404).send()
        }
    })
})

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id
    const { _id } = req.body

    Post.findById(id).then( post => {
        User.find({username: post.username}).then(user => {
            if (user._id !== _id){
                User.findById(_id).then(userDeleting => {
                    if (userDeleting.isAdmin){
                        post.remove()
                        res.status(200).send()
                    }
                    else{
                        res.status(404).send()
                    }
                })
            }else{
                post.remove()
                res.status(200).send()
            }
        }, err => {
            res.status(500).send(err)
        })
    })
})

/** Image API routes below */
app.post("/images", multipartMiddleware, (req, res) => {

    cloudinary.uploader.upload(
        req.body.curFile,
        function (result) {
            var img = new Image({
                image_id: result.public_id,
                image_url: result.url,
                username: req.body.username,
            })

            img.save().then(
                saveRes => {
                    res.send(saveRes)
                }, error => {
                    res.status(400).send(error)
                }
            )
        }
    )
})

app.get("/images/:username", (req, res) => {
    const username = req.params.username
    Image.findOne({username: username}).then(image => {
        if (!image) {
            res.status(404).send()
        } else {
            res.send(image)
        }
    })
})

app.patch("/images/:imageID", (req, res) => {
    const imageID = req.params.imageID

    cloudinary.uploader.destroy(imageID)
    cloudinary.uploader.upload(
        req.body.curFile,
        function (result) {
            Image.findOne({username: req.body.username}).then(image => {
                if (!image) {
                    res.status(404).send()
                } else {
                    image.image_id = result.public_id
                    image.image_url = result.url
                    image.save().then(saveRes => {
                        res.send(saveRes)
                    }, error => {
                        res.status(400).send(error)
                    })
                }
            })
        }
    )
})

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