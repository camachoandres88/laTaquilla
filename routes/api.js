var express = require('express');
var router = express.Router();
var status = require('http-status');
var mongoose = require( 'mongoose' );
var UserModel = mongoose.model('User');
var ClientModel = mongoose.model('Client');
var EventModel = mongoose.model('Event');
var TicketModel = mongoose.model('Ticket');
var log = require('../libs/log')(module);

router.route('/ticketsByClient/:email')
	.get(function(req, res){
 		UserModel.findOne({email : req.params.email}, function(err, user) {
	 		if (err) { 
	 			return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.errmsg});
	        }

	        if (!user) { 
	        	return res.status(status.OK).json({ message: 'No data found.'});
	        }

			var events =  EventModel.find({owner : user._id}).select('_id');	

			if(events){
				var tikets =  TicketModel.find({}).where('event').in(events);
				return res.status(status.OK).json(tikets);
			};
 		});
	});

router.post('/events',function (req, res) {
	if(req.body.name && req.body.description && req.body.owner){
		var userEvent = new EventModel();
		userEvent.name = req.body.name;
		userEvent.description = req.body.description;
		userEvent.owner = req.body.owner;
	    userEvent.save(function(err, createdEvent) {
	        if(err){
	        	log.error(err);
	        	return res.status(status.INTERNAL_SERVER_ERROR).send({message:err.errmsg});
	        } 
	        else{
	        	 res.status(status.OK).json(createdEvent);
	        } 
	    });	
	}else{
		res.send({message:'Event data required.'});
	}
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
