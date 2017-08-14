
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Passport Google Package
var User = require('../models/user'); // Import User Model
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter'; // Create custom sec

module.exports = function(app, passport,mongoose) {
	app.use(passport.initialize());
	app.use(passport.session());
  	
  //passport will serilize/deserilize user instance from and to session 
  	passport.serializeUser(function(user, done) {
  		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
  		User.findById(id, function(err, user) {
    		done(err, user);
  		});
	});

  
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
	passport.use(new GoogleStrategy({
	    clientID: '989539758135-d1imma1qqkv5la5b15nr4d2pphkcthjj.apps.googleusercontent.com',
	    clientSecret: 'u8UuADHY6TKC-WXjQPZrRojk',
	    callbackURL: "http://localhost:8080/auth/google/callback",
	  },
	  function(accessToken, refreshToken, profile, done) {
        User.findOne({'google.id': profile.id}, function (err, user) {
        	if(err) return done(err);

        	if(user) {
            	console.log('User: ' + profile.displayName + ' logged in!');
            	done(null, user);
        	} else {
            	var newUser = new User();
            	newUser.google.id  = profile.id;
            	newUser.userName = profile.displayName;
            	newUser.email = profile.emails[0].value;
            	newUser.save(function(err) {
                	if(err) throw err;
                	console.log('New User: ' + newUser.username + ' created and logged in!');
                	done(null, newUser);
            	});
        	}
    	});

       
    }
	));

	// GET /auth/google
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Google authentication will involve
	//   redirecting the user to google.com.  After authorization, Google
	//   will redirect the user back to this application at /auth/google/callback
	app.get('/auth/google',
	  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
	  	'https://www.googleapis.com/auth/userinfo.email'] }));

	// GET /auth/google/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/login', failureFlash: true  }),
	  function(req, res) {
	  	console.log(req.session.passport.user)
	    res.redirect('/');
	});
	return passport;
}