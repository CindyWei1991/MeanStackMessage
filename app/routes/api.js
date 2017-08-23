var User = require('../models/user.js');
//var jwt = require('jsonwebtoken');
//var secret = "harrypotter"
var Message = require('../models/message.js')

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
		console.log("saving user")
			  // save the user
				user.save(function(err) {
		  		if (err) {
					  if (err.errors && err.errors.email) {
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

router.post('/send/sendMessage', function(req, res) {
	console.log(req.body);
	var message = new Message();
	message.text = req.body.text;
	message.category = req.body.category;
	message.sendor = req.body.sendor._id;
	//to find the object id of the user
	User.findOne({'email' : req.body.receiver.email}).exec(function(err, user) {
		if (err) {
			console.log(err);
			res.json ({success:false,message:"Cannot find the email adress."})
		} 
		if(user) {
			console.log(user._id);
			message.receiver = user._id;
			// Check if request is valid and not empty or null
			if (!message.text || !message.category || !message.sendor || !message.receiver) {
				console.log("err")
					res.json({ success: false, message: 'Ensure all required fields are provided' });
			} else {
					// save the user
					message.save(function(err) {
						if (err) {
							res.json({success:false,message:err.errors})
							console.log(err)
						} else {
							console.log("message saved")
							res.json({success:true,message:"Message saved"});
						}
					})
			};
		}
	});
	
});

router.get('/messages', function(req, res) {
	if (req.session.user) {
		Message.find({'receiver': req.session.user._id})
		.populate('sendor', 'userName')
		.exec(function(err, message) {
			if (err) {
				res.json({success:false, message:'no message'});
			}
			if (message) {
				res.json({success:true, message: message});
			}
		})
	} else {
		res.json({success: false, message:'authentication error'});
  } 
});

router.get('/messageCount/:category', function(req, res) {
	console.log(req.params.category)
		Message.find({'receiver': req.session.user._id, 'category': req.params.category})
		.count(function(err, count) {
			if (err) {
				res.json({success: fasle, count: 0});
			} else {
				res.json({success: true, count: count})
			}
		})

});
  return router;
}

