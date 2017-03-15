var moootools = require('mootools');

module.exports =  new Class({
  Implements: [Options, Events],
  
  ON_ADD: 'onAdd',
  ON_REMOVE: 'onRemove',
  
  options: {
  },
  
  
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
		done(new Error('User ' + id + ' does not exist'));
  },
  /**
   * needed for node-express-authentication->passport intregration
   * */
  findByUserName: function(username){
		return null;
  },
  
  findByID: function(id){
		return null;
  },
  
  load: function(users){
		users.each(function(u){
			this.add(u);
		}.bind(this));
	},
	add: function(user){
		this.fireEvent(this.ON_ADD, user);
		return user;
	},
	remove: function(user){
		this.fireEvent(this.ON_REMOVE, user);
		return user;
	},
	update: function(user){
		this.fireEvent(this.ON_UPDATE, user);
		return user;
	},
	removeByUserName: function(username){
		var user = this.findByUserName(username);
		if(user != null)
			user = this.remove(user);
			
		return user;
	},
	removeByID: function(id){
		var user = this.findByID(id);
		if(user != null)
			user = this.remove(user);
			
		return user;
	},
	updateByUserName: function(username){
		var user = this.findByUserName(username);
		if(user != null)
			user = this.update(user);
			
		return user;
	},
	updateByID: function(id){
		var user = this.findByID(id);
		if(user != null)
			user = this.update(user);
			
		return user;
	},
	save: function(){
		return null;
	}
});
