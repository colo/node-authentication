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
  serialize: function(user, done) {
		done(null, user.id);
  },
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
  findByUserName: function(username){
		var user = null;
		this.options.users.each(function(u){
			if (u.username == username) {
			user = u;
			}
		});

		return user;
  }
});
