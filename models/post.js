const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    additionalComment: {
        type: String,
    }
    criteriaLabels: {
        type: [String],
        required: true
    }
    criteriaRatings: {
        type: [Number],
        required: true
    }
})

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    allDay: {
        type: Boolean,
        required: true
    }
});

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        unique: false,
    },
	tag: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	}, 
	title: {
		type: String,
		required: true,
		minlength: 1
    },
    viewCount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    events: {
        type: [EventSchema]
    },
    ratings: {
        type: [RatingSchema]
    }
})

// make a model using the Post schema
const Post = mongoose.model('Post', PostSchema)
module.exports = { Post }