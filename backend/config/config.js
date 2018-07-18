const config = {
    facebook_config:{
        app_id:'1436444016501049',
        app_secret:'62028240578c76c97b1e45334885c07c',
        callback_url:'http://localhost:3000/auth/facebook/callback'
    },
    database:{
        host:'mongodb://localhost:',
	    port:27017,
	    name:'TeamUpDb'
    }
}

module.exports = config;