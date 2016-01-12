var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var UserModel = mongoose.model('User');
var passport = require('passport');
var log = require('../libs/log')(module);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup',function (req, res) {
	if(req.body.username && req.body.password){
		var user = new UserModel({ username: req.body.username, password: req.body.password });
	    user.save(function(err, user) {
	        if(err){
	        	log.error(err);
	        	return res.send({message:err.errmsg});
	        } 
	        else{
	        	res.send({ username: req.body.username, password: req.body.password });
	        } 
	    });		
	}else{
		res.send({message:'Username and Password are required.'});
	}
});

router.get('/userInfo',
    passport.authenticate('bearer', { session: false }),
        function(req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate a scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
        }
);


module.exports = router;
