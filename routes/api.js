var express = require('express');
var router = express.Router();
var status = require('http-status');
var mongoose = require( 'mongoose' );
var UserModel = mongoose.model('User');
var ClientModel = mongoose.model('Client');
var EventModel = mongoose.model('Event');
var TicketModel = mongoose.model('Ticket');
var log = require('../libs/log')(module);

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
