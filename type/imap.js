var moootools = require('mootools');

var ImapConnection = require('imap').ImapConnection;

module.exports =  new Class({
  Implements: [Options, Events],
  
  options: {
	host: 'localhost',
	port: 143,
	secure: false
  },
  
  initialize: function(options){
	this.setOptions(options);
  },
  authenticate: function (username, password, fn) {
	
	var imap = new ImapConnection(Object.merge({
		username: username,
		password: password
	  }, this.options));
	
	imap.connect(function(err){
// 	  var user = null;
	  if(err){
// 		console.log(util.inspect(err.message));
// 		imap.logout(function(){
		  return fn(err, null);
// 		});//logout
	  }
	  
	  imap.logout(function(){
		return fn(null, username);
	  });//logout
	  
	});//connect
	
	
  },
});
