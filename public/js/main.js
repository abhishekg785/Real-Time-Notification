/*
*   abhishek goswami (hiro)
*   abhishekg785@gmail.com
*   github : abhishekg785
*
*   main.js : file handles the fetching the notification from the backend at real time
*   and populating the notis at front-end ,and for the similar kind of other stuff.
*/

(function($, io, d){

    var socket = io.connect(),
        isVisible = false;

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
          isVisible = true;
          $('.drop-nav li').css('border-bottom', '1px solid #1abc9c');
          $('.drop-nav li').css('height', '36px');
          $('.drop-nav li').css('padding-top', '20px');
        },

        hideDropNav : function(){
          isVisible = false;
          $('.drop-nav li').animate({
            padding : 0,
            border : 0
          },400);
          $('.drop-nav li').css('height', '0px');

        }
    }

    //when the front end recieves the new notification
    socket.on('new notification', function(data){
        mainFunctions.hideNoNotificationStatus();
        if(isVisible === true){   // nav drop is visibile
          var item = '<li style = "height:36px;padding-top:20px;border-bottom:1px solid #1abc9c">' + data.notification + '</li>';     // item to be added to the list in the drop nav
        }
        else{
          var item = '<li>' + data.notification + '</li>';
        }
        var str = $('.drop-nav li:eq(1)').before(item);
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
            }
            else{
                mainFunctions.hideDropNav();
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
            }
        });
    });

})(jQuery, io, document);
