var users = {
	'superman': {
		first: 'Clark',
		last: 'Kent'
	},
	'spiderman': {
		first: 'Peter',
		last: 'Parker'
	},
	'batman': {
		first: 'Bruce',
		last: 'Wayne'
	}
};

module.exports = {
	getUser: function (name, callback) {
		// do real database stuff here
		var user = users[name];
		if (user) {
			callback(null, user);
		}
		else {
			callback(new Error('User not found'));
		}
	}
};