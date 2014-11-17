var express = require('express');
var app = express();

app.use(require('./db_server'));
app.use(require('./static_server'));

var port = process.env.PORT || 80;
app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});