var Auth = require('./auth');

var ImapConnection = require('imap').ImapConnection;

module.exports =  new Class({
  Extends: Auth,
  
  options: {
		host: 'localhost',
		port: 143,
		secure: false
  },
  
  initialize: function(options){
		this.parent(options);
  },
  authenticate: function (username, password, fn) {
	
		var imap = new ImapConnection(Object.merge({
			username: username,
			password: password
		}, this.options));
		
		imap.connect(function(err){

			if(err){
				return fn(err, null);
			}
			
			imap.logout(function(){
				return fn(null, username);
			});//logout
			
		});//connect
	
	
  },
});
