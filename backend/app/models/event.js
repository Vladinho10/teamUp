const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const db = mongoose.connection;
const EventSchema = new Schema({
    title: String,
    type: String,
    description: String,
    date: String,
    time:String,
    location: String,
    quantity: Number,
    admins: [String],
    players: [String],
    completed: Boolean,
    photo:String
})

module.exports = EventSchema;