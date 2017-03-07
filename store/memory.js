var moootools = require('mootools');

module.exports =  new Class({
  Implements: [Options, Events],
  
//   users: [
//    { id: 1, username: 'lbueno@e-ducativa.com' , role: 'admin'},
//   ],
  
  users: [],
  
  initialize: function(users){
	this.users = users;
  },
  serialize: function(user, done) {
	done(null, user.id);
  },
  deserialize: function(id, done) {
	var notFound = true;
	this.users.each(function(user){
// 	  //console.log(user['id']);
// 	  //console.log(id);

	  if (user['id'] == id) {
		notFound = false;
// 		fn(null, user);
		done(null, user);
	  } 
	});

	if(notFound === true)
	  done(new Error('User ' + id + ' does not exist'));
// 	  fn(new Error('User ' + id + ' does not exist'));

// 	this.findById(id, function (err, user) {
// 	  done(err, user);
// 	});
  },
  findByUserName: function(username){
	var user = null;
	this.users.each(function(u){
	  if (u.username == username) {
		user = u;
	  }
	});

	return user;
  }
});
