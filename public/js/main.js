/*
*   abhishek goswami
*   abhishekg785@gmail.com
*  
*   main.js file
*/

//create a socket connection
var socket = io.connect(),
    count;

socket.on('new notification', function(noti_data){
	console.log('new notification arrived');
	var el = document.querySelector('.notification');
    var drop_nav_head = document.querySelector('#drop-nav-head span');
	count = Number(el.getAttribute('data-count')) || 0;
    el.setAttribute('data-count', count + 1);
    drop_nav_head.innerHTML = count + 1;
    el.classList.remove('notify');
    el.offsetWidth = el.offsetWidth;
    el.classList.add('notify');
    if(count === 0){
        el.classList.add('show-count');
    }
});


var notificationButton = $('.notification'),
    isVisible = false,
    $drop_nav = $('.drop-nav'),
    $drop_nav_head = $('#drop-nav-head span');

notificationButton.click(function(){
    if(!isVisible){
        $drop_nav.css('display', 'block');
        if(count){
          $drop_nav_head.text(count + 1);
        }
        else{
          $drop_nav_head.text(0);
        }
        isVisible = true;
    }
    else{
        $drop_nav.css('display', 'none');
        isVisible = false;
    }
});