/*!
 * Copyright 2014, Jeffrey Poland
 * Released under the MIT License.
 * http://jquery.org/license
 */

//JP Slides ///////////////////////////////// JP Slides /////////////////////////////////
(function($) {
  $.fn.slides = function(slides_options) {

    /* Small carousel Settings */
    var slidesSettings = $.extend({
      // These are the defaults.
      thumbs: "off",
      slide_title: "on",
      markers: "on",
      controller: "off",
      full_width_image: "off"

    }, slides_options);

    var slidesContainer = this;
    var main_image = ".slide_view img";
    var slide_images = ".slide_imgs img";
    $(slidesContainer).css('opacity', '0');
    $(slidesContainer).prepend('<div class="slides_view_wrap"><div class="slide_view"><img></div><div class="slide_image_title"></div></div>');
    $(slidesContainer).css('overflow', 'hidden');
    $(slidesContainer).find(main_image).parent().parent().prepend('<div class="swipe"></div>');
    $(slidesContainer).find(main_image).parent().parent().prepend('<div class="back no_select"><a > < </a></div>');
    $(slidesContainer).find(main_image).parent().parent().prepend('<div class="next no_select" ><a > > </a></div>');


    /* add active class to the first image in the thumbnail images*/ ////////////////////////////////
    $(slidesContainer).each(function() {

      // No thumb nail add markers     
      if (slidesSettings.markers === "on" && slidesSettings.thumbs === "off") {

        $(this).find(slide_images).attr({
          src: 'img/icons/dot.jpg'
        });
        $(this).find(slide_images).css('width', '10px');
        $(this).find(slide_images).css('height', '10px');
        $(this).find(slide_images).css('box-shadow', 'none');
        $(this).find(slide_images).parent().parent().css('text-align', 'center');
        $(this).find(slide_images).addClass('round');
        $(this).find(slide_images).first().attr({
          src: 'img/icons/dot_active.jpg'
        });


      } else if (slidesSettings.markers === "off" && slidesSettings.thumbs === "off") {

        $(this).find('.slide_imgs').css('display', 'none');


      } else if (slidesSettings.thumbs === "off") {

        $(this).find('.slide_imgs').css('display', 'none');

      }

      if (slidesSettings.slide_title === "off") {

        $(this).find('.slide_image_title').remove();
      }

      // Mark first and Last Images
      $(this).find(slide_images).first().parent().addClass('first');
      $(this).find(slide_images).last().parent().addClass('last');

      //Assign First Image
      var startimg = $(this).find('.first').attr('href');

      $(this).find(slide_images).first().addClass('active');
      $(this).find(main_image).attr('src', startimg);

      var active = $(this).find('.active').attr("title");


      /* if full width*/
      $(this).find(main_image).load(function() {

        if (slidesSettings.full_width_image === "on") {
          $(this).addClass('full');


          var imageH = $(this).height();


          var container = $(this).parent().height();

          var calculatePos = (imageH - container) / 2;

          $(this).css('margin-top', '0px');
          $(this).css('margin-top', '-' + (calculatePos) + 'px');

        } else {

          $(this).addClass('reg');

        }

        $(slidesContainer).css('opacity', '1');

      });

      /* get path*/
      path($(this));

      alignBackNext();

      if (slidesSettings.controller === "on") {

        var beforeThumbs = $(this).find(slide_images).parent().parent();

        $('<div class="playStop"><div class="play_control"></div><div class="stop_control"></div><div class="pause_control"><div class="pauseline"></div><div class="pauseline"></div></div></div>').insertBefore(beforeThumbs);




      }

    }); // End Each Function


    /// Align Back and Next Buttons
    function alignBackNext() {

      $(slidesContainer).find('div.back').css('top', '50%');
      $(slidesContainer).find('div.back').css('margin-top', '-' + ($('div.back').height() * 2) + 'px');
      $(slidesContainer).find('div.next').css('top', '50%');
      $(slidesContainer).find('div.next').css('margin-top', '-' + ($('div.next').height() * 2) + 'px');

    }

    $(window).resize(function() {

      var imageH = $(slidesContainer).find('img.full').height();
      var container = $(slidesContainer).find('div.slide_view').height();
      var imagePos = imageH - container;

      /* if full width*/
      if ($(slidesContainer).find('.full').height() > 800) {

        $(slidesContainer).find('img.full').css('margin-top', '-' + (imagePos) / 2 + 'px');


      } else {


        $(slidesContainer).find('img.full').css('margin-top', '-' + (imagePos) / 2 + 'px');

      }

      alignBackNext();

    }); // End Window Resize Function


    //Previous Button///////////////////////////////// Previous Button /////////////////////////////////
    $(function() {
      $(slidesContainer).find('div.back').click(function(e) {
        e.preventDefault();
        goback($(this));

      });
    });



    //Swipe Right///////////////////////////////// Swipe Right /////////////////////////////////

    $(function() {
      // Bind the swipeleftHandler callback function to the swipe event on div.box
      $(slidesContainer).find("div.swipe").on("swiperight", swipeRightHandler);

      // Callback function references the event target and adds the 'swipe' class to it
      function swipeRightHandler(event) {
        event.preventDefault();
        goback($(this));

      }
    });

    //Next Button/////////////////////////////////// Next Button /////////////////////////////////
    $(function() {
      $(slidesContainer).find('div.next').click(function(e) {
        e.preventDefault();
        next($(this));

      });
    });

    //Swipe Left///////////////////////////////// Swipe Left /////////////////////////////////

    $(function() {
      // Bind the swipeleftHandler callback function to the swipe event on div.box
      $(slidesContainer).find("div.swipe").on("swipeleft", swipeLeftHandler);

      // Callback function references the event target and adds the 'swipe' class to it
      function swipeLeftHandler(event) {
        event.preventDefault();
        next($(this));

      }
    });



    function controller() {
      $('.stop_control').addClass('stopgrey');
      var getInterval;

      $('.play_control').unbind('click').click(function(event) {

        clearInterval(getInterval);

        $('.stop_control').addClass('stopgrey');
        $('.pauseline').removeClass('stopgrey');
        $('.play_control').removeClass('playgrey');

        var getNextSlide = $(this).parent().parent().find('.next');
        next($(getNextSlide));

        $(this).next().removeClass('stopgrey');
        $(this).next().next().find('.pauseline').removeClass('stopgrey');
        $(this).addClass('playgrey');

        getInterval = setInterval(function() {
          next(getNextSlide);
        }, 2000);

      });

      $('.stop_control').unbind('click').click(function(event) {


        $(this).addClass('stopgrey');
        $(this).prev().removeClass('playgrey');
        $(this).next().find('.pauseline').removeClass('stopgrey');

        clearInterval(getInterval);

      });

      $('.pause_control').unbind('click').click(function(event) {
        $(this).find('.pauseline').addClass('stopgrey');
        $(this).prev().removeClass('stopgrey');
        $(this).prev().prev().removeClass('playgrey');
        clearInterval(getInterval);

      });



    }

    if (slidesSettings.controller === "on") {
      controller();
    }



    function next(myThis) {


      var lastImg = myThis.parent().parent().find('.last').find('img');

      if ((lastImg).hasClass('active')) {

        var findFirstImg = myThis.parent().parent().find('.first');

        myThis.parent().parent().find(slide_images).removeClass('active');

        $(findFirstImg).find('img').addClass('active');

        var marker = $(findFirstImg).find('img').attr('src');

        if (marker === "img/icons/dot.jpg") {
          myThis.parent().parent().find(slide_images).attr({
            src: 'img/icons/dot.jpg'
          });
          $(findFirstImg).find('img').attr({
            src: 'img/icons/dot_active.jpg'
          });
        }

        //get the parent to grab the path from the href and pass it 
        var imgScr = $(findFirstImg).attr('href');
        //assign new image src
        myThis.parent().find(main_image).attr('src', imgScr);
         

        /* if full width*/
        full(myThis);


      } else {


        var nextImg = myThis.parent().parent().find('.active').parent('a').next('a').find('img');



        myThis.parent().parent().find(slide_images).removeClass('active');
        $(nextImg).addClass('active');
        var marker_next = $(nextImg).attr('src');

        if (marker_next === "img/icons/dot.jpg") {
          myThis.parent().parent().find(slide_images).attr({
            src: 'img/icons/dot.jpg'
          });
          $(nextImg).attr({
            src: 'img/icons/dot_active.jpg'
          });


        }


        //get the parent to grab the path from the href and pass it 
        var nextImgScr = $(nextImg).parent().attr('href');
        //assign new image src
        myThis.parent().parent().find(main_image).attr('src', nextImgScr);

        /* if full width*/
        full(myThis);

      }

      /* Path*/
      path(myThis);





    }

    function goback(myThis) {


      var firstImg = myThis.parent().parent().find('.first').find('img');

      if ((firstImg).hasClass('active')) {

        var lastImg = myThis.parent().parent().find('.last');

        myThis.parent().parent().find(slide_images).removeClass('active');

        $(lastImg).find('img').addClass('active');

        var marker_last = $(lastImg).find('img').attr('src');

        if (marker_last === "img/icons/dot.jpg") {
          myThis.parent().parent().find(slide_images).attr({
            src: 'img/icons/dot.jpg'
          });
          $(lastImg).find('img').attr({
            src: 'img/icons/dot_active.jpg'
          });
        }

        //get the parent to grab the path from the href and pass it 
        var imageScr = $(lastImg).attr('href');
        //assign new image src
         myThis.parent().find(main_image).attr('src', imageScr);

        /* if full width*/
        full(myThis);


      } else {


        var prevImg = myThis.parent().parent().find('.active').parent('a').prev('a').find('img');

        myThis.parent().parent().find(slide_images).removeClass('active');

        $(prevImg).addClass('active');

        var marker_prev = $(prevImg).attr('src');

        if (marker_prev === "img/icons/dot.jpg") {
          myThis.parent().parent().find(slide_images).attr({
            src: 'img/icons/dot.jpg'
          });
          $(prevImg).attr({
            src: 'img/icons/dot_active.jpg'
          });
        }
        //get the parent to grab the path from the href and pass it 
        var prevImageScr = $(prevImg).parent().attr('href');
        //assign new image src
         myThis.parent().parent().find(main_image).attr('src', prevImageScr);
        /* if full width*/
        full(myThis);


      }

      /* Path*/
      path(myThis);

    }
    //full width image function
    function full(myThis) {

      myThis.parent().find('.full').load(function() {

        var imageH = myThis.height();
        var container = myThis.parent().height();

        var centerImg = (imageH - container) / 2;


        myThis.css('margin-top', '-' + (centerImg) + 'px');


      });

    }
     //make image tile a link
    function path(myThis) {


      var active = myThis.parent().parent().find('.active').attr("title");
      var myPath = myThis.parent().parent().find('.active').attr("data-path");

      if ((myPath) === "" || (myPath) === null || (myPath) === undefined) {

        myThis.parent().find('div.slide_image_title').html('<p>' + active + '</p>');

      } else {

        myThis.parent().find('div.slide_image_title').html('<p><a href="' + myPath + '">' + active + '</a></p>');

      }




    }

    ///Thumbnail click function
    $(slidesContainer).find(slide_images).click(function(e) {
      e.preventDefault();

      $(this).parent().parent().find(' a img').removeClass('active');

      $(this).addClass('active');

      var myMarker = $(this).attr('src');

      if (myMarker === "img/icons/dot.jpg") {
        $(this).parent().parent().parent().find(slide_images).attr({
          src: 'img/icons/dot.jpg'
        });
        $(this).attr({
          src: 'img/icons/dot_active.jpg'
        });
      }

      var c = $(this).attr('title');
      var path = $(this).attr('data-path');

      if ((path) === "" || (path) === null || (path) === "undefined") {
        $(this).parent().parent().parent().find('div.slide_image_title').html('<p>' + c + '</p>');
      } else {
        $(this).parent().parent().parent().find('div.slide_image_title').html('<p><a href="' + p + '">' + c + '</a></p>');

      }


      //get the parent to grab the path from the href and pass it 
      var p = $(this).parent('a').attr('href');

      $(this).parent().parent().parent().find(main_image).fadeOut('fast', function() {
        $(this).parent().parent().parent().find(main_image).attr('src', p);
        $(this).parent().parent().parent().find(main_image).attr('title', c);
        $(this).parent().parent().parent().find(main_image).fadeIn('fast');

      });


    });

  };

   //preload large imgs
  var preloadImgs = [];

  $(document).ready(function() {

    $(".slide_imgs a").each(function() {

      var img = new Image();
      img.src = $(this).attr('href');
      preloadImgs.push(img);

    });
  });


  $('.slides').slides();


}(window.jQuery));