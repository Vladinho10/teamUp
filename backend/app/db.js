'use strict';
const mongoose = require('mongoose');

const config_db = require('../config/config').database;

let database_url = config_db.host + config_db.port+ '/' + config_db.name;

mongoose.connect(database_url);

const db = mongoose.connection;
db.once('open',function(){
	console.log('connection says:  I am ok bro ;Lets to do great things )');
});

module.exports = db;