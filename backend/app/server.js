'use strict';
//const googleStorageDriver =  require('./tools/uploadGoogle');
//const firebase = require('./tools/firebase');
const config = require('../config/config');
const base64maker = require('./tools/base64maker');
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
const utf8 = require('utf8');
const {check,validationResult} = require('express-validator/check');
const {User,Event,Notification} = require('./model_crud');
const filterUser = require('./tools/filtrUser');

const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        // console.log(file);
        cb(null,config.paths.users_img_dest);
    },
    filename:function(req,file,cb){
        req.user_filename = req.user.id + '-'+ Date.now() + '-avatar.jpg';
        cb(null,req.user_filename);
    }
});

const Storage_Event = multer.diskStorage({
    destination:function(req,file,cb){
        // console.log(file);
        req.directory = config.paths.events_img_dest;
        cb(null,req.directory);
    },
    filename:function(req,file,cb){
        req.event_filename = 'event' + Date.now() + '.jpg';
        cb(null,req.event_filename);
    }
});

const upload = multer({storage:Storage});
const upload2 = multer({storage:Storage_Event});

app.use(express.static(path.join(__dirname,config.paths.static_folder)));

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
    // console.log('in / path');
    // console.log(req.user.id);
        if(!req.user){
            res.sendFile(path.join(__dirname,config.paths.index));
            return;
        }
        else{
            res.redirect('/dashboard');
        }
});



app.get('/api/events/:type',(req,res)=>{
    if(req.user){
        let data = {};
        let type = req.params.type.split("$")[0];
        let page = req.params.type.split("$")[1];
        if(type == 'own_events'){
            Event.find({admins:{"$in":[req.user.id]}}).sort({_id:-1}).skip(page*5).limit(5).then((own_events)=>{
                data.events = own_events;
                // console.log('vvvvvvvvllllllllaaaaaadddddd',data);
                res.json(data);
            });
        }
        else if(type == 'suggested'){
            Event.find({players:{"$nin":[req.user.id]}}).sort({_id:-1}).skip(page*5).limit(5).then((suggested_events)=>{
                data.events = suggested_events;
                // console.log('in suggested');
                res.json(data);
            });
        }
        else if(type == 'attending'){
            Event.find({players:{"$in":[req.user.id]}}).sort({_id:-1}).skip(page*5).limit(5).then((attending_events)=>{
                data.events = attending_events.filter((elem)=>{
                    return elem.admins[0] != req.user.id;
                });
                // console.log('in attending');
                res.json(data);
            });
        }
        else if(req.params.type.split('$')[0] == 'profile_events'){
            let data = {};
            User.findOne({_id:req.params.type.split('$')[1]}).then((user)=>{
                // console.log(user,'user--->');
                Event.find({_id:{'$in':user.own_events}}).then((events)=>{
                    data.own_events = events;
                    Event.find({_id:{'$in':user.attending_events}}).then((events)=>{
                        data.attending_events = events;
                        res.json(data);
                    });
                });
            })
            //Event.findAll({_id:{"$in":}})
        }
        else{
            res.end();
        }

    }else{
        res.sendStatus(401);
    }
 });

 app.get('/api/user/:id',(req,res)=>{
    if(req.user) {
        User.findOne({_id: (req.params.id=='me')?req.user.id:req.params.id})
        .populate(['own_events']).then((user)=> {
            res.json(filterUser(user,false));
        });

    } else {
        res.sendStatus(401)
    }
 });

 app.get('/api/profile/:id',(req,res)=>{
    if(req.user){
        Event.find({admins:req.user.id}).then((events)=>{
            let checking_arr = [];

            for(let i in events){
                checking_arr = checking_arr.concat(events[i].players);
             }

            User.find({_id:req.params.id}).then((user)=>{
                console.log(checking_arr);
                console.log(checking_arr.includes(req.params.id));

                res.json(filterUser(user[0],checking_arr.includes(req.params.id)));

            });
         });
     }
 });

 app.get('/api/event/:id',(req,res)=>{
    // console.log('ping');
    if(req.user){
        Event.find({_id:req.params.id}).then((event)=>{
            // console.log(event);
            res.json({event});
        });
    }else{
        res.sendStatus(401);
    }

});

app.get('/logout',(req,res)=>{
    if(req.user){
        // console.log(req.user,'before destroy');
        req.logout();
        // console.log(req.user,'after destroy');
    }
    res.redirect('/');
});

app.get('/api/notifications',(req,res)=>{
    if(req.user){
        Notification.find({to:req.user.id,seen:false}).populate('from').populate('event').then((notifications)=>{
            res.json({notify:notifications});
        });
    }else{
        res.sendStatus(401);
    }
});

app.get('/*', (req,res) => {
    //console.log(req.user.id);
    if(req.user){
        res.sendFile(path.join(__dirname,config.paths.index));
    }else{
        res.redirect('/');
}
});

app.post('/api/dashboard',(req,res)=>{
   // console.log(req.body);
    // console.log('under api/dashboard');
    if(req.user){
        // console.log('under req.user');
        let data = {};
            // console.log('under event callback');
            User.findOne({_id:req.user.id}).then((user)=>{
                console.log(filterUser(user,true));
                data.user = filterUser(user,true);
                    Event.find({players:{"$nin":[req.user.id]}}).sort({_id:-1}).limit(5).then((going_events)=>{
                        data.suggested = Object.assign([],going_events);
                        //console.log(data.suggested,'scakjvckasv');
                        if(data.suggested.length == 0){
                            res.json(data);
                            //console.log('111111111111111');
                        }
                        for(let i=0;i<data.suggested.length;i++){
                            User.find({_id:data.suggested[i].admins[0]}).then((admin)=>{
                                data.suggested[i] = Object.assign({},data.suggested[i]._doc);
                                data.suggested[i].admins = admin;
                                //console.log(admin,'admin');
                                if( i == data.suggested.length-1 ){
                                    //console.log(data.suggested[i].admins[0],'<------>');
                                    res.json(data);
                                }
                            });
                        }

                    });
            });

    }else{
        res.sendStatus(401);
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
   // console.log('-->',req.body);
    //  console.log('---------><---------');
     if(req.user && req.body.avatar){
         console.log('I am hereeeeeeeeeeeeeeeeeeee');
        User.findOneAndUpdate({_id:req.user.id},{$set:{photo:req.body.avatar}},{new:true}).then((err,data)=>{
             console.log(1111111111111111111111111);
            res.json({photo:data.photo});
        });
    }
    else if(req.user && req.body.phone){
        User.updateOne({_id:req.user.id},{$set:{phone:req.body.phone}}).then((status,data)=>{
                res.json({phone:req.body.phone});
        });
    }
    else if(req.user && req.body.name){
        User.updateOne({_id:req.user.id},{$set:{name:req.body.name}}).then((status,data)=>{
                res.json({name:req.body.name});
        });
    }else{
        res.sendStatus(401);
    }
 });

 app.post('/api/notifications/seen',(req,res) =>{
    let array = req.body.seen;
    let count = 0;
        for(let i = 0;i<array.length;i++){
            Notification.update({_id:array[i]},{$set:{seen:true}}).then((status)=>{
                count ++;
                if(count == array.length){
                    res.json({st:'OK'});
                }
            });
        }
 });

 app.post('/api/create_event',upload2.single('photo'),(req,res) => {
     //console.log('-->',req.body);
    if(req.user){
        // console.log(req.body);
        let img_src;
        if(req.body.photo){
            img_src = req.body.photo;
        }else{
            img_src = undefined;
        }
            let ev = new Event({
                title: req.body.event_title,
                type:req.body.event_type,
                description: req.body.event_description,
                date: req.body.datepicker,
                time:req.body.timepicker,
                type:req.body.event_type,
                location: req.body.event_address,
                quantity: req.body.event_members_count,
                admins: [req.user.id],
                players: [req.user.id],
                completed: false,
                photo:img_src
              }).save().then((data)=>{
                //   console.log(data);
                  User.updateOne({_id:req.user.id},{$push:{own_events:data._id}}).then((err,status)=>{
                    if(err)
                        console.log(err);
                    else
                        console.log('success');
                  });
                  res.json({event:data});
              });


        }
    // res.json({done: "truee"})
 });

 app.post('/api/add_or_delete_participant',(req,res)=>{
    if(req.user){
        if(req.body.action == 'add')
        {
            let data;
            Event.findOneAndUpdate({_id:req.body.ev_id,players:{"$nin":[req.user.id]}},{$push:{players:req.user.id}},{new:true}).then((event)=>{
                data = event;
                User.updateOne({_id:req.user.id},{$push:{attending_events:req.body.ev_id}}).then((status1)=>{
                    if(data){
                        let notific = new Notification({
                            from: req.user.id,
                            to: data.admins[0],
                            date: Date.now(),
                            type:'join',  //can be join,unjoin,invite,reminder
                            seen:false,
                            event:data._id
                        }).save().then((status)=>{
                            res.json(filterUser(data,false));
                        });
                        console.log(data.players.length);
                    }else{

                        res.json({err:"event object not found"});
                    }

                })

            });
        }
        else if(req.body.action == 'delete'){
            let data;
            Event.findOneAndUpdate({_id:req.body.ev_id,players:{"$in":[req.user.id]}},{$pull:{players:req.user.id}},{new:true}).then((event)=>{
                data = event;
                User.updateOne({_id:req.user.id},{$pull:{attending_events:req.body.ev_id}}).then((status1)=>{
                    if(data){
                        let notific = new Notification({
                            from: req.user.id,
                            to: data.admins[0],
                            date: Date.now(),
                            type:'unjoin',  //can be join,unjoin,invite,reminder
                            seen:false,
                            event:data._id
                        }).save().then((status)=>{
                            res.json({max_members:data.players.length});
                        });
                    }else{

                        res.json({err:"event object not found"});
                    }

                })

            });
        }
    }else{
        res.sendStatus(401);
    }
 });

 app.post('/api/participants',(req,res)=>{
     if(req.user){
         let part_data = [];
         User.find({_id:{$in:req.body.participants}}).then((participants)=>{
            for(let i = 0;i<participants.length;i++){
                part_data.push(filterUser(participants[i],false));
            }
            res.json({part_data});
         });
     }
 });
 app.post('/api/notification_creater',(req,res) =>{
    if(req.user){
        console.log(req.body.to);
        new Notification({
            from: req.user.id,
            to: req.body.to,
            date: Date.now(),
            type:req.body.type,  //can be join,unjoin,invite,reminder
            seen:false,
            event: req.body.event
        }).save().then((data)=>{
            res.json({status:"OK"});
            console.log(data,'notification');
        });
    }else{
        res.sendStatus(401);
    }
 });
app.post('/api/notification_check_invite',(req,res)=>{
    if(req.user){
        Notification.find({to:req.body.to,from:req.user.id}).select('event').then((notification)=>{
            res.json({events:notification});
        });
    }else{
        res.sendStatus(401);
    }

});
 app.post('/api/search_results/:keyword',(req,res)=>{  //use encodeURIComponent
     if(req.user){
        let keyword = req.params.keyword;
        //console.log(req.user.id);
        let search_result = {};
        let user_id = req.user.id;
        Event.find({title:{"$regex":'^'+keyword,"$options":'i'},admins:{"$nin":[user_id]}}).then((events)=>{
            //console.log(events);
            search_result.events = Object.assign([],events);
            search_result.events = search_result.events.filter((el) => {
                return el.admins[0] != user_id
            });
            //console.log(search_result);
            User.find({name:{"$regex":'^'+keyword,"$options":'i'},_id:{"$ne":user_id}}).then((users)=>{
                // console.log(users);
                search_result.users = Object.assign([],users);
                // console.log(search_result);
                res.json(search_result);
            });
        });
     }else{
         res.sendStatus(401);
     }
 });

 app.post('/api/search_results_load/:option',(req,res)=>{  //use encodeURIComponent
    if(req.user){
        console.log(req.params, 'request params');
        console.log(req.query, 'request queries');
        let option = req.params.option;
        let clientCursor = req.query.from;
        let serverCursor = +clientCursor + 5;
        let keyword = req.query.keyword;
        let search_result = {};
        let user_id = req.user.id;

        if (option === 'events') {
            Event.find({title:{"$regex":'^'+keyword,"$options":'i'},admins:{"$nin":[user_id]}}).then((events)=>{
                console.log(serverCursor, 'servercursor');
                console.log(events.length, 'leeeeeeeeeeeeeeeeeeeeeeeeeeength');
                if (clientCursor >= events.length) {
                    res.end();
                } else {
                    search_result.events = events.slice( clientCursor, serverCursor );
                    search_result.cursor = serverCursor;
                    search_result.length = events.length;
                    res.json(search_result);
                }
         });
        } else {
            User.find({name:{"$regex":'^'+keyword,"$options":'i'},_id:{"$ne":user_id}}).then((users)=>{
                if (clientCursor >= users.length) {
                    res.status(200).send();
                } else {
                    search_result.users = users.slice( clientCursor, serverCursor );
                    search_result.cursor = serverCursor;
                    res.json(search_result);
                }
            });
        }
    } else{
        res.sendStatus(401);
    }
});

app.put('/api/change_event/:id',upload2.single('photo'),(req,res)=>{
   //  console.log('---------><---------');
   console.log(`aaaaaaaa`, req.params.id);
   console.log(`zzzzzzzzzzzzzzzzzzzzzzz`, req.body);
    if(req.user){

      let img_src;
      if(req.file){
          img_src = '/images/events_images/' + req.event_filename;
      }else{
          img_src = undefined;
      }
      var query   = { id: req.param.id };
      var update  = {
        title: req.body.event_title,
        type:req.body.event_type,
        description: req.body.event_description,
        date: req.body.datepicker,
        time:req.body.timepicker,
        type:req.body.event_type,
        location: req.body.event_address,
        quantity: req.body.event_members_count,
        admins: [req.user.id],
        players: [req.user.id],
        completed: false,
        photo:img_src
      };
      var options = { new: true };
      Event.findOneAndUpdate(query, update, options, function(err, doc){
        if(err) console.log(err);
        console.log('docccccccccccc', doc);
        res.json({events: doc})
      });

   } else {
       res.sendStatus(401);
   }
});

app.delete('/api/change_event/:id', (req,res)=>{
   //  console.log('---------><---------');
    if(req.user){
    console.log(`req.bodyyyyyyyyyyyy`, req.body);
      Event.findByIdAndRemove(req.params.id, () => {
        console.log(`idddddddddddd`, req.params.id);
        res.redirect('/dashboard');
      })
   }else{
       res.sendStatus(401);
   }
});



module.exports = app;
