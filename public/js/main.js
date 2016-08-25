/*
*   abhishek goswami
*   abhishekg785@gmail.com
*  
*   main.js file
*/

(function($, io, d){

    var socket = io.connect();

    //when the front end recieves the new notification    
    socket.on('new notification', function(noti_data){
    var el = d.querySelector('.notification');
        // var drop_nav_head = d.querySelector('#drop-nav-head span');
    var count = Number(el.getAttribute('data-count')) || 0;
        el.setAttribute('data-count', count + 1);
        el.classList.add('show-count');
        // drop_nav_head.innerHTML = count + 1;
        el.classList.remove('notify');
        el.offsetWidth = el.offsetWidth;
        el.classList.add('notify');
        if(count === 0){
            el.classList.add('show-count');
        }
    });

    $(d).ready(function(){
        var notificationButton = $('.notification'),
            isVisible = false,
            $drop_nav = $('.drop-nav');
            // $drop_nav_head = $('#drop-nav-head span');

        notificationButton.click(function(e){
            e.stopPropagation();
            if(!isVisible){
                $('.notification').removeClass('show-count');
                var count = $('.notification').attr('data-count');
                $('.notification').attr('data-count', 0);
                socket.emit('change notification status');            // change the notification status to 'seen' at the backend 
                $drop_nav.css('display', 'block');
                // if(count){
                //   $drop_nav_head.text(count);
                // }
                // else{
                //   $drop_nav_head.text(0);
                // }
                isVisible = true;
            }
            else{
                $drop_nav.css('display', 'none');
                isVisible = false;
            }
        });

        //to initilalize the data with the no of unread notification
        socket.on('initialize data', function(data){
            $('.notification').attr('data-count', data.unseen_noti_count);
        });

        $('body').click(function(){
            if(isVisible){ 
              $drop_nav.css('display', 'none');
              isVisible = false;
            }
        });
    });

})(jQuery, io, document);