var moootools = require('mootools');

module.exports =  new Class({
  Implements: [Options, Events],
  
//   users: [
//    { id: 1, username: 'lbueno@e-ducativa.com' , role: 'admin'},
//   ],
  
  //users: [],
  options: {
		users: null,
  },
  
  //initialize: function(users){
		//this.options.users = users;
  //},
  initialize: function(options){
		this.setOptions(options);
  },
  /**
   * needed for node-express-authentication->passport intregration
   * */
  serialize: function(user, done) {
		done(null, user.id);
  },
  /**
   * needed for node-express-authentication->passport intregration
   * */
  deserialize: function(id, done) {
		var notFound = true;
		this.options.users.each(function(user){
			if (user['id'] == id) {
				notFound = false;
				done(null, user);
			} 
		});

		if(notFound === true)
			done(new Error('User ' + id + ' does not exist'));

  },
  /**
   * needed for node-express-authentication->passport intregration
   * */
  findByUserName: function(username){
		var user = null;
		this.options.users.each(function(u){
			if (u.username == username) {
				user = u;
			}
		});

		return user;
  },
  
  findByID: function(id){
		var user = null;
		
		this.options.users.each(function(u){
			if (u.id == id) {
				user = u;
			}
		});

		return user;
  },
  
  addUsers: function(users){
		users.each(function(u){
			this.addUser(u);
		}.bind(this));
	},
	addUser: function(user){
		//if(user.id && user.username && user.role){
			//var u = {
				//id: user.id,
				//username: user.username,
				//role: user.role
			//};
			
			//this.options.users.push(u);
		if(user.id && user.username){
			this.options.users.push(user);
		}
		else{
			 throw Error('Invalid id|username format');
		}
	},
	removeUser: function(user){
		try{
			this.options.users.each(function(u, index){
				if(u.id == user.id && u.username == user.username){
					 this.options.users.splice(index, 1);
					 throw new Error('user found');
				}
			}.bind(this));
			
			return null;
		}
		catch(e){
			console.log(e);
			
			return user;
		}
		
		
	},
	removeByUserName: function(username){
		var user = this.findByUserName(username);
		if(user != null)
			user = this.removeUser(user);
			
		return user;
	},
	removeByID: function(id){
		var user = this.findByID(id);
		if(user != null)
			user = this.removeUser(user);
			
		return user;
	},
});
