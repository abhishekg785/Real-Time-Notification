/*
*  abhishek goswami
*  abhishekg785@gmail.com
*  github : abhishekg785
*
*  socket_module.js : creates a websocket connection each time a new user connects 
*/

var timeMaxRange = 10,
    timeLowRange = 1,
    timeFactor = 1000;  //to make it for ms

var socket_Functions = {

	// function to create a random time between 1-5 seconds to create a random notifications for the users
	createRandomTime : function(){
		return generatedTime = Math.floor((Math.random() * timeMaxRange * timeFactor) + timeLowRange * timeFactor);
	}
}


module.exports = function(io){
	io.sockets.on('connection', function(socket){

		/*
		*  create a random time and send a random notification to the user side
		*/

		var randTime = socket_Functions.createRandomTime();
		setInterval(function(){
			console.log(randTime);
			io.emit('new notification', {
				notification : 'notification_data' + randTime
			});
		randTime = socket_Functions.createRandomTime();
		},randTime);
	});
}
