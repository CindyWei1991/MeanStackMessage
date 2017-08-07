var User = require('../models/user.js');

module.exports = function(router) {
	router.post('/users', function(req, res) {
		var user = new User();
		user.userName = req.body.userName;
		user.password = req.body.password;
		user.email = req.body.email;
		// Check if request is valid and not empty or null
        if (req.body.userName === null || req.body.userName === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.name === null || req.body.name === '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
			// save the user
			user.save(function(err) {
	  			if (err) {
	  				res.json({success:false,message:"Already exists"})
	  			} else {
	  				res.json({success:true,message:"User saved"});
	  			}
	  		})
	  	};
	});

	return router;
}