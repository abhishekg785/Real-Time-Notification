/*
*  abhishek goswami
*  abhishekg785@gmail.com
*  github : abhishekg785
*
*  socket_module.js : creates a websocket connection each time a new user connects 
*/

var NotificationModel = require('./models/notificationModel.js');
var shared_module = require('./shared_module');

var timeMaxRange = 5,
    timeLowRange = 1,
    timeFactor = 10000;  //to make it for ms

var socket_Functions = {

	// function to create a random time between 1-5 seconds to create a random notifications for the users
	createRandomTime : function(){
		return generatedTime = Math.floor((Math.random() * timeMaxRange * timeFactor) + timeLowRange * timeFactor);
	}
}


module.exports = function(io){
	io.sockets.on('connection', function(socket){

		console.log('user connected');

		/*
		*  as soon as the user connects to the server , send him the track of the unread notifications
		*  fetch the unseen notifivations from the user
		*/

		//shared module contains all the general functions in use :) making the code modular
		shared_module.getUnseenNotifications(function(data){
			//get the unseen notifications using callback mechanism from the mongo db 
			//emit the data
			io.emit('initialize data', {'unseen_noti_count' : data.length, 'unseen_noti_arr' : data});
		});


		/*
		*  create a random time and create a random notification for the user
		*  store the notification in the db with unseen status at the initial to keep the record of the unseen notis
		*  after storing , emit the noti at the front end side
		*/

		var randTime = socket_Functions.createRandomTime();
		setInterval(function(){
			console.log(randTime);
			var notiText = 'sample notification' + randTime;
			var newNotification = NotificationModel({
				notification_text : notiText
			});
			newNotification.save(function(err, data){
				if(!err){
					console.log(data);
					io.emit('new notification', {
				        notification : 'notification_data' + randTime
			        });
				}
				else{
					console.log('error occurred');
					console.log(err);
				}
			});
		randTime = socket_Functions.createRandomTime();
		},randTime);

		//change the notification seen status to true when the user has seen the notifications
		socket.on('change notification status', function(){
			shared_module.changeNotificationStatus();
			socket.broadcast.emit('update other tabs');             // to synchronize the data in other tabs with the change in the current tab(useful when the user session)
		});

		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});
}
