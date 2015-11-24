var express = require('express');
var router = express.Router();

router.route('/tickets')
	.get(function(req, res){
		return res.send({message:'This is not implemented now'});
	});

router.route('/ticket/:id')
	.get(function(req, res){
		return res.send({message:'TODO get an existing ticket by using param ' + req.params.id});
	});

module.exports = router;
