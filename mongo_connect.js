var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noti_app', function(err){
	if(!err){
		console.log('connected to db');
	}
	else{
		console.log('error occurred');
		console.log(err);
	}
});