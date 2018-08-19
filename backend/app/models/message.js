const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const db = mongoose.connection;
const MessageSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    date: String,
    payload:String,
    seen:Boolean
});

module.exports = MessageSchema;