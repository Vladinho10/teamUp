const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const db = mongoose.connection;
const UserSchema = new Schema({
    fb_id: String,
    name: String,
    phone: String,
    photo: String,
    access_token: String,
    refresh_token: String,
    own_events: [String],
    attending_events: [String],
    finished_events: [String]
})

module.exports = UserSchema;