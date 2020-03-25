const mongoose = require('mongoose')

//For the field icsString we should change it to instead store the parsed events so we only need to parse the string once
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

// make a model using the rating schema
const Rating = mongoose.model('Rating', RatingSchema)
module.exports = { Rating }