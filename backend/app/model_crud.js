const userScheme = require('./models/user');
const eventScheme = require('./models/event');
const notificationScheme = require('./models/notification');
const mongoose = require('mongoose');

userScheme.statics.findUser = function(id,res){
    let user = this.findOne({_id:id}).then((data) => res.json({user: data}));
}

userScheme.statics.addUser = function(user,done,displayName){
    let existing_check = User.findOne({fb_id:user.fb_id},(err, check_user) =>{
        //console.log('----->',check_user);
       
       if(!check_user){
           let new_user = new User({
               fb_id:user.fb_id,
               name:user.name,
               phone:user.phone,
               access_token:user.access_token,
               refresh_token:user.refresh_token,
               own_events:[],
               attending_events:[],
               finished_events:[],
               photo:user.photo
           }).save().then((data)=>{
               let obj = {id:data._id,name:displayName};
               console.log(data._id,'<-----');
               done(null,obj);});
       }
       else{
           done(null,{id:check_user._id,name:displayName});
       }

   });


}


const User = mongoose.model('User',userScheme);
const Event = mongoose.model('Event',eventScheme);
const Notification  = mongoose.model('Notification',notificationScheme);
module.exports = {User,Event,Notification};
