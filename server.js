//packages required
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');//built in, no need to run npm install
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport)

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));//give access to static files  

//database configuration
mongoose.connect('mongodb://localhost:27017/FlashBulb', function(err) {
  if (err) {
    console.log('Not connected to database ' + err);
  } else {
    console.log('successfully connected to mongoDb');
  }
});

var store = new MongoDBStore(
    {
      uri: 'mongodb://localhost:27017/FlashBulb',
      collection: 'userSessions'
    }
);
//create a middleware session to record the user
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store:store,
  cookie: {
      maxAge: 1000 * 60 * 60// 1 hour
  },
}));

//must out the router after session config
//so that we can use the session in router
var appRoutes = require('./app/routes/api')(router);
app.use('/api',appRoutes);


app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});

app.listen(port, function() {
	console.log("app listening at " + port);
});