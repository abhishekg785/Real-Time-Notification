/*
*   abhishek goswami
*   abhishekg785@gmail.com
*
*   main.js file
*/

(function($, io, d){

    var socket = io.connect();

    var mainFunctions = {
        clearDropNav : function(){
            $('.drop-nav').empty();
            $('.drop-nav').append("<li id = 'drop-nav-head'>Notifications</li>");
        },

        // to set the drop nav to none or no unread notifications left
        setDropNavStatusToNone : function(){
          mainFunctions.clearDropNav();
          var item = '<li id = "noNotiStatus">No unread Notifications Yet :)</li>';
          $('.drop-nav').append(item);
        },

        hideNoNotificationStatus : function(){
          $('#noNotiStatus').css('display', 'none');
        },

        showDropNav : function(){
          $('.drop-nav').css('display', 'block');
        },

        hideDropNav : function(){
          $('.drop-nav').css('display', 'none');
        }
    }

    //when the front end recieves the new notification
    socket.on('new notification', function(data){
        mainFunctions.hideNoNotificationStatus();
        var item = '<li>' + data.notification + '</li>';     // item to be added to the list in the drop nav
        $('.drop-nav li:eq(1)').before(item);
        var el = d.querySelector('.notification');
        var count = Number(el.getAttribute('data-count')) || 0;
        el.setAttribute('data-count', count + 1);
        el.classList.add('show-count');
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
                mainFunctions.showDropNav();
                isVisible = true;
            }
            else{
                mainFunctions.hideDropNav();
                isVisible = false;
            }
        });

        //to initilalize the data with the no of unread notification
        socket.on('initialize data', function(data){
            /*
            *  get the unread notification from the backend
            *  check the count if count > 0 : show the count ? do nothing at the moment
            *  populate the navbar with the unread notifications
            */
            console.log('fetched the unread notifications');
            if(data.unseen_noti_count > 0){
                $('.notification').addClass('show-count');
            }
            $('.notification').attr('data-count', data.unseen_noti_count);
            var unseen_noti_arr = data.unseen_noti_arr;
            console.log(unseen_noti_arr.length);
            if(unseen_noti_arr.length > 0){
                unseen_noti_arr.forEach(function(data){
                    var item = '<li>' + data.notification_text +'</li>';
                    $('.drop-nav').append(item);
                });
            }
            else{
              mainFunctions.setDropNavStatusToNone();
            }
        });

        //to synchronize all the other open tabs (will be uselful in case where user session will be created to keep the track of the users)
        // socket.on('update other tabs', function(){
        //     location.reload();
        // });

        $('body').click(function(){
            if(isVisible){
              mainFunctions.hideDropNav();
              isVisible = false;
            }
        });
    });

})(jQuery, io, document);
