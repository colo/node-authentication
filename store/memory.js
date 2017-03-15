var Store = require('./store');

module.exports =  new Class({
  Extends: Store,
  
  users: [],
  
  options: {
  },
  
  initialize: function(users){
		this.load(users);
  },
  /**
   * needed for node-express-authentication->passport intregration
   * */
  //serialize: function(user, done) {
		//done(null, user.id);
  //},
  /**
   * needed for node-express-authentication->passport intregration
   * */
  deserialize: function(id, done) {
		var notFound = true;
		this.users.each(function(user){
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
		this.users.each(function(u){
			if (u.username == username) {
				user = u;
			}
		});

		return user;
  },
  
  findByID: function(id){
		var user = null;
		
		this.users.each(function(u){
			if (u.id == id) {
				user = u;
			}
		});

		return user;
  },
  
  //load: function(users){
		//users.each(function(u){
			//this.add(u);
		//}.bind(this));
	//},
	
	add: function(user){
		//if(user.id && user.username && user.role){
			//var u = {
				//id: user.id,
				//username: user.username,
				//role: user.role
			//};
			
			//this.users.push(u);
		if(user.id && user.username){
			this.users.push(user);
			return this.parent(user);
		}
		else{
			 throw new Error('Invalid id|username format');
		}
	},
	remove: function(user){
		try{
			this.users.each(function(u, index){
				if(u.id == user.id && u.username == user.username){
					 this.users.splice(index, 1);
					 throw new Error('user found');
				}
			}.bind(this));
			
			return this.parent(null);
		}
		catch(e){
			//console.log(e);
			
			return this.parent(user);
		}
		
		
	},
	update: function(user){
		try{
			this.users.each(function(u, index){
				if(u.id == user.id && u.username == user.username){
					 //this.users.splice(index, 1);
					 this.users[index] = user;
					 throw new Error('user found');
				}
			}.bind(this));
			
			return this.parent(null);
		}
		catch(e){
			//console.log(e);
			
			return this.parent(user);
		}
		
		
	},
	//removeByUserName: function(username){
		//var user = this.findByUserName(username);
		//if(user != null)
			//user = this.remove(user);
			
		//return user;
	//},
	//removeByID: function(id){
		//var user = this.findByID(id);
		//if(user != null)
			//user = this.remove(user);
			
		//return user;
	//},
	//save: function(){}
});
