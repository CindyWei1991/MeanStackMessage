//packages required
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');//built in, no need to run npm install


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));//give access to static files  
app.use('/api',appRoutes); 



mongoose.connect('mongodb://localhost:27017/FlashBulb', function(err) {
	if (err) {
		console.log('Not connected to database ' + err);
	} else {
		console.log('successfully connected to mongoDb');
	}
});
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});

app.listen(port, function() {
	console.log("app listening at " + port);
});