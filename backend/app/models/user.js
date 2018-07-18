const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.once("open", function () {
    console.log('Connection is OK')
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
})

const User = mongoose.connect('User', UserSchema)
module.exports = User;