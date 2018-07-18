const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const db = mongoose.connection;
db.once("open", function () {
    console.log('Connection is OK')
});


const UserSchema = new Schema({
    fb_id: String,
    name: String,
    phone: Number,
    photo: String,
    access_token: String,
    refresh_token: String,
    own_events: [String],
    attending_events: [String],
    finished_events: [String]
})

const User = mongoose.connect('User', UserSchema)
module.exports = User;