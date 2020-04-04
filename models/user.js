const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Not valid email'
        }
    },
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	}, 
	password: {
		type: String,
		required: true,
		minlength: 4
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

UserSchema.pre('save', function(next) {
	const user = this; 

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this 

	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }