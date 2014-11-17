var express = require('express');
var handlebars = require('express-handlebars');
var fs = require('fs');
var url = require('url');
var path = require('path');
var app = express();

app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/db', function (req, res) {
	// render index
	res.render('user', req.user);
});

app.get('/remote', function (req, res) {
	// render index
	res.status(502).render('502', {
		message: 'Forbidden'
	});
});

app.get('*', function (req, res, next) {
	var parsed = url.parse(req.url);
	var pathname = parsed.pathname;
	var relative = path.resolve(__dirname, '../views/pages', pathname.substring(1)) + '.handlebars';
	fs.stat(relative, function (err) {
		if (err) {
			res.status(404).render('404', {
				message: 'File not found'
			});
		}
		else {
			res.render(relative, {
				input: req.query.input
			});
		}
	});
});

app.get('*', function (req, res) {
	res.status(404).render('404', {
		message: 'File not found'
	});
});

app.use(function (err, req, res, next) {
	res.status(500).render('500', {
		message: err.message
	});
});

module.exports = app;