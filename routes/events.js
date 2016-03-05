var express = require('express');
var router = express.Router();
var status = require('http-status');
var mongoose = require( 'mongoose' );
var UserModel = mongoose.model('User');
var EventModel = mongoose.model('Event');
var log = require('../libs/log')(module);


router.route('/events')
	.get(function(req, res){
		EventModel.find({}, function(err, eventsFinded) {
	 		if (err) { 
	 			return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.errmsg});
	        }

	        if (!eventsFinded) { 
	        	return res.status(status.OK).json({ message: 'No data found.'});
	        }

			return res.status(status.OK).json(eventsFinded);
 		});
});

router.route('/events/:id')
	.get(function(req, res){
 		EventModel.findById(req.params.id, function(err, eventFinded) {
	 		if (err) { 
	 			return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.errmsg});
	        }

	        if (!eventFinded) { 
	        	return res.status(status.OK).json({ message: 'No data found.'});
	        }

			return res.status(status.OK).json(eventFinded);
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
	        	 res.status(status.OK).json({id:createdEvent._id});
	        } 
	    });	
	}else{
		res.send({message:'Event data required.'});
	}
});

module.exports = router;
