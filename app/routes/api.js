var User = require('../models/user.js');
//var jwt = require('jsonwebtoken');
//var secret = "harrypotter"


module.exports = function(router) {
router.post('/register', function(req, res) {
		var user = new User();
		user.userName = req.body.userName;
		user.password = req.body.password;
		user.email = req.body.email;
		// Check if request is valid and not empty or null
    if (!req.body.userName || !req.body.password || !req.body.email) {
        res.json({ success: false, message: 'Ensure username, email, and password were provided' });
    } else {
			  // save the user
				user.save(function(err) {
		  		if (err) {
					  if (err.errors.email) {
						res.json({success:false,message:err.errors.email.message})
					  } else {
						res.json({success:false,message:err.errors})
					  }
		  		} else {
		  			res.json({success:true,message:"User saved"});
		  		}
	  	  })
	  };
});

router.post('/login', function(req, res) {
	// find each person with the user name
	// selecting the `name` and `password` fields
	// execute the query at a later time
	User.findOne({ $or: [
		{userName: req.body.userName},
		{email: req.body.userName}]
	}).select('email userName password')
	.exec(function(err,user) {
		if(err) throw err;
		if (!user) {
			res.json({success: false, message: 'Could not authenticate the user'});
		} else if (user) {
			if(req.body.password) {
				var validPassword = user.comparePassword(req.body.password);
			} else {
				res.json({success: false, message: 'No password provided'});
			}
			if (!validPassword) {
				res.json({success: false, message:'Could not authenticate the password'});
			} else {
				req.session.user = user
				//var token = jwt.sign({userName: user.userName, email: user.email}, secret, {expiresIn : '24h'});
				res.json({success: true, message:'User authenticated'});
			}
		}
	});

});

router.get('/user', function(req, res) {
	if (req.session.user) {
		res.json({success: true, user: req.session.user});
	} else {
		res.json({success: false});
  } 
});
	

router.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			res.json({success: false, message: err});
		} else {
			res.json({success: true, message: "Logging out successfully"});
		}

	})
});

  return router;
}

