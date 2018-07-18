const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const db = mongoose.connection;
db.once("open", function () {
    console.log('Connection is OK')
});

const EventSchema = new Schema({
    title: String,
    type: String,
    description: String,
    date: Date,
    location: String,
    quantity: Number,
    admins: [String],
    players: [String],
    completed: Boolean,
})

const Event = mongoose.connect('Event', EventSchema)
module.exports = Event;