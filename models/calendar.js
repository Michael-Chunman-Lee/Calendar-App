const mongoose = require('mongoose')

//For the field icsString we should change it to instead store the parsed events so we only need to parse the string once
const CalendarSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    icsString: {
        type: String,
        required: true
    }
})

// make a model using the Calendar schema
const Calendar = mongoose.model('Calendar', CalendarSchema)
module.exports = { Calendar }