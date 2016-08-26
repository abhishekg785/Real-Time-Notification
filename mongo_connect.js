/*
*  abhishek goswami(hiro)
*  abhishekg7852gmail.com
*  github : abhishekg785
*
*  mongo_connect.js : module to connect app to mongo DB
*/
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
