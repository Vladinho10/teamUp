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
const {check,validationResult} = require('express-validator/check');
const {User,Event} = require('./model_crud');

const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file);
        cb(null,'../frontend/dist/images/users_images');
    },
    filename:function(req,file,cb){
        req.event_filename = req.user.id + '-'+ Date.now() + '-avatar' +'.jpg' 
        cb(null,req.event_filename);
    }
});

const Storage_Event = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file);
        req.directory = '../frontend/dist/images/events_images';
        cb(null,req.directory);
    },
    filename:function(req,file,cb){
        req.event_filename = 'event' + Date.now() + '.jpg'; 
        cb(null,req.event_filename);
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
    console.log(req.user.id);
        if(!req.user){
            res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
            return;
        }
        res.redirect('/dashboard');


});

app.get('/*', (req,res) => {
    //console.log(req.user.id);
    if(req.user){
        res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
    }else{
        res.redirect('/');
}
});

app.post('/api/dashboard',(req,res)=>{
   // console.log(req.body);
    console.log('under api/dashboard');
    if(req.user){
        console.log('under req.user');
        let data = {};
            console.log('under event callback');
            User.findOne({_id:req.user.id}).then((user)=>{
                data.user = Object.assign({},user._doc);
                    Event.find({players:{"$nin":[req.user.id]}}).then((going_events)=>{
                        data.suggested =going_events;
                        console.log(data);
                        res.json(data);
                    });
            });
        
    }
 });
/*
data.user = Object.assign({},user._doc);
                Event.find({admins:{"$in":[req.user.id]}}).then((own_events)=>{
                    data.user.own_events = own_events;
                    Event.find({players:{"$in":[req.user.id]}}).then((going_events)=>{
                        data.user.attending_events = going_events;
                        res.json(data);
                    });
                });
*/ 

 app.post('/api/edit_profile',upload.single('avatar'),(req,res)=>{
     console.log('---------><---------');
     if(req.user && req.file){
        User.updateOne({_id:req.user.id},{$set:{photo:'/images/users_images/'  + req.user.id + '-avatar.jpg' }}).then((err,data)=>{
            console.log('saved');
            res.json({photo:'/images/users_images/'  + req.user.id + '-avatar.jpg'});
        });
    }
    if(req.body.phone){
        User.updateOne({_id:req.user.id},{$set:{phone:req.body.phone}}).then((status,data)=>{
                res.json({phone:req.body.phone});
        });
    }
    if(req.body.name){
        User.updateOne({_id:req.user.id},{$set:{name:req.body.name}}).then((status,data)=>{
                res.json({name:req.body.name});
        });
    }
 });

 app.post('/api/create_event',upload2.single('photo'),(req,res) => {
    if(req.user){
        console.log(req.body);
        let img_src;
        if(req.file){
            img_src = '/images/events_images/' + req.event_filename;
        }else{
            img_src = undefined;
        }
            let ev = new Event({
                title: req.body.event_title,
                description: req.body.event_description,
                date: req.body.datepicker,
                location: req.body.event_address,
                quantity: req.body.event_members_count,
                admins: [req.user.id],
                players: [req.user.id],
                completed: false,
                photo:img_src
              }).save().then((data)=>{
                  console.log(data);
                  User.updateOne({_id:req.user.id},{$push:{own_events:data._id}}).then((err,status)=>{
                    if(err)
                        console.log(err);
                    else
                        console.log('success');
                  });
                  res.json({event:data});
              });
              
              
        }
    console.log(req.body);
    console.log(req.file);
    // res.json({done: "truee"})
 });
module.exports = app;
