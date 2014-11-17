var express = require('express');
var app = express();

var users = require('./users');

app.get('/db', function (req, res, next) {
	var name = req.query.name;
	users.getUser(name, function (err, result) {
		if (err) {
			next(err);
		}
		else {
			req.user = result;
			next();
		}
	});
});

module.exports = app;