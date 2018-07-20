'use strict';
const userScheme = require('./models/user');
const mongoose = require('mongoose');

userScheme.statics.findUser = function(id,res){
	let user = this.findOne({fb_id:id}).then((data) => res.json({user: data}));
}

userScheme.statics.addUser = function(user,done,obj){
    let existing_check = User.findOne({fb_id:user.fb_id},(err, check_user) =>{
        console.log('----->',check_user);

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
            }).save().then((data)=>{done(null,obj);});
        }
        else{
            done(null,obj);
        }
        
    });
    
    
}


const User = mongoose.model('User',userScheme);

module.exports = User;