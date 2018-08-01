const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const db = mongoose.connection;
const NotificationSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: String,
    date: String,
    type:String,  //can be join,unjoin,invite,reminder
    seen:Boolean,
    event:  { type: Schema.Types.ObjectId, ref: 'Event' }
});

module.exports = NotificationSchema;