var express = require('express');
var router = express.Router();
var status = require('http-status');
var mongoose = require( 'mongoose' );
var UserModel = mongoose.model('User');
var ClientModel = mongoose.model('Client');
var TicketStatusModel = mongoose.model('TicketStatus');
var TicketModel = mongoose.model('Ticket');
var ClaimantModel = mongoose.model('Claimant');
var log = require('../libs/log')(module);


router.post('/ticketStatusMasive',function (req, res) {
	if(req.body.status){
	    TicketStatusModel.collection.insert(req.body.status, function(err, statusCreated) {
	        if(err){
	        	log.error(err);
	        	return res.status(status.INTERNAL_SERVER_ERROR).send({message:err.errmsg});
	        } 
	        else{
	        	 res.status(status.OK).json(statusCreated);
	        } 
	    });	
	}else{
		res.send({message:'Ticket Status data required.'});
	}
});

router.post('/ticketMasiveForEvent',function (req, res) {
	if(req.body.tickets && req.body.event){
        var counter = 0;
		var ticketSaved = [];
        var ticketWithError = [];        
        
        TicketModel.remove({
            event: req.body.event
        }, function (err) {
            if (err) { 
                log.error(err);
                return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.errmsg});
            }
            
            for(var i = 0; i<req.body.tickets.length ; i++){
                var ticket = req.body.tickets[i];
                var ticketSchema = new TicketModel(ticket);           
            
                ticketSchema.save(function(err, createdEvent) {
                    counter++;
                    if(err){
                        log.error(err);
                        ticketWithError.push({tiket:ticketSchema,error:err});
                    } 
                    else{
                        ticketSaved.push(createdEvent);
                    } 
                    
                    if(counter == req.body.tickets.length){
                        return res.status(status.OK).json({saved:ticketSaved,error:ticketWithError});
                    }            
                });             
            }     
        });      
          
	}else{
		res.send({message:'Ticket Status data required.'});
	}
});



router.route('/tickets')
	.get(function(req, res){
 		TicketModel.find({}, function(err, tickets) {
		 		if (err) { 
		 			return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.errmsg});
		        }

		        if (!tickets) { 
		        	return res.status(status.OK).json({ message: 'No data found.'});
		        }

				return res.status(status.OK).json(tickets);
			}
 		);
});


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


router.route('/ticket/:id')
	.get(function(req, res){
		return res.send({message:'TODO get an existing ticket by using param ' + req.params.id});
	});


module.exports = router;
