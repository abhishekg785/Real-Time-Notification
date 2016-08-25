var NotificationModel = require('./models/notificationModel.js');

module.exports = sharedFunctions = {
	getUnseenNotifications : function(callback){
		var query = NotificationModel.find({'seen_status' : false});
		query.exec(function(err, data){
			callback(data);
		});
	},

	changeNotificationStatus : function(){
		var query = { 'seen_status' : false },
		    update = { 'seen_status' : true },
		    options = { multi: true };
		NotificationModel.update(query, update, options, function(err, data){
			console.log(data);
		});
	}
}