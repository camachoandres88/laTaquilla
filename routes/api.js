var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var ClientModel = mongoose.model('Client');
var log = require('../libs/log')(module);

router.route('/tickets')
	.get(function(req, res){
		return res.send({message:'This is not implemented now'});
	});

router.route('/ticket/:id')
	.get(function(req, res){
		return res.send({message:'TODO get an existing ticket by using param ' + req.params.id});
	});


router.post('/client',function (req, res) {
	if(req.body.name && req.body.clientId && req.body.clientSecret ){
		var client = new ClientModel({ name: req.body.name, clientId: req.body.clientId, clientSecret: req.body.clientSecret});
	    client.save(function(err, client) {
	         if(err){
	        	log.error(err);
	        	return res.send({message:err.errmsg});
	        } 
	        else{
	        	res.send({ name: req.body.name, clientId: req.body.clientId, clientSecret: req.body.clientSecret});
	        } 
	    });	
	}else{
		res.send({message:'Username and Password are required.'});
	}
});

module.exports = router;
