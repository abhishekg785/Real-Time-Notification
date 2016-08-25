/*
*   abhishek goswami
*   abhishekg785@gmail.com
*   notificationModel.js : To keep track of read and unread notifications
*/

var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
	notification_text : String,
	date : {
		type : Date,
		default : Date.now
	},
	seen_status : {
		type : Boolean,
		default : false
	}
});

var NotificationModel = mongoose.model('NotificationModel', notificationSchema);

module.exports = NotificationModel;
