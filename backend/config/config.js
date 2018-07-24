const config = {
    facebook_config:{
        app_id:'228838837938699',
        app_secret:'e68aaa2875efc7512e5f5bfeef810e50',
        callback_url:'http://localhost:3000/auth/facebook/callback'
    },
    database:{
        host:'mongodb://localhost:',
	    port:27017,
	    name:'TeamUpDb'
    }
}

module.exports = config;