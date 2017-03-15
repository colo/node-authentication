var Auth = require('./auth');

module.exports =  new Class({
  Extends: Auth,
  
  users: [],
  
  initialize: function(users){
		this.users = users;
  },
  
  authenticate: function (username, password, fn) {
		var user = null;
		var error = null;
		
		try{
			this.users.each(function(item){
			//this.users.each(function(item){
				if(item.username == username && item.password == password){
					user = username;
					throw new Error('user found');
				}
			});
			
			error = 'Invalid user or password';
			return fn(error, user);
		}
		catch(e){//user found
			//console.log('user found');
			return fn(error, user);
		}
	
  },
});
