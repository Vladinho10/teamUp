'use strict';
const path = require('path');
const express = require('express');
const multer = require('multer');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');

const {User,Event} = require('./model_crud');

const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file);
        cb(null,'../frontend/dist/images/users_images');
    },
    filename:function(req,file,cb){
        cb(null,req.user.id + '-' + 'avatar' +'.jpg');
    }
});

const Storage_Event = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file);
        cb(null,'../frontend/dist/images/events_images');
    },
    filename:function(req,file,cb){
        cb(null,req.user.id + '-' + 'event' + Date.now() + '.jpg');
    }
});

const upload = multer({storage:Storage});
const upload2 = multer({storage:Storage_Event});

app.use(express.static(path.join(__dirname,'../../frontend/dist')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(session({secret: '123'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors());

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/' }));
app.get('/',(req,res)=>{
    console.log('in / path');
        if(!req.user){
            res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
            return;
        }
        res.redirect('/dashboard');


});

app.get('/*', (req,res) => {
    if(req.user){
        res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
    }else{
        res.redirect('/');
}
});

app.post('/api/dashboard',(req,res)=>{
    console.log(req.body);
    console.log('under api/dashboard');
    if(req.user){
        console.log('under req.user');
        let data = {};
        Event.find({}).then((events)=>{
            data.events = events;
            console.log('under event callback');
            User.findOne({fb_id:req.user.id}).then((user)=>{
                data.user = user;
                console.log(data);
                res.json(data);
            });
        });
    }
 });


 app.post('/api/upload_user_image',upload.single('avatar'),(req,res)=>{
    if(req.user){
        console.log(req.user.id);

        User.updateOne({fb_id:req.user.id},{$set:{photo:'/images/users_images/'  + req.user.id + '-avatar.jpg' }}).then((err,data)=>{
            console.log('saved');
        });
    }
 });

 app.post('/api/events',upload2.single('photo'),(req,res) => {

    console.log(req.body);
    console.log(req.file);
 });
module.exports = app;
