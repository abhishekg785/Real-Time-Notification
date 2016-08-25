/*
*  abhishek goswami
*  abhishekg785@gmail.com
*  github : abhishekg785
*
*  shared_module.js : file contains all the general function to be shared among various modules
*/

var NotificationModel = require('./models/notificationModel.js');

module.exports = sharedFunctions = {
	getUnseenNotifications : function(callback){
		var query = NotificationModel.find({'seen_status' : false});
		query.exec(function(err, data){
			callback(data);
		});
	},

	//convert the status to seen
	changeNotificationStatus : function(){
		var query = { 'seen_status' : false },
		    update = { 'seen_status' : true },
		    options = { multi: true };
		NotificationModel.update(query, update, options, function(err, data){
			console.log(data);
		});
	}
}