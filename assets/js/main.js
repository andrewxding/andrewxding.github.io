$(function(){

      var  $body = $('body')

       $('.curtains').curtain({
           scrollSpeed: 300,
           controls: 'nav',
           curtainLinks: '.curtain-links',
         //  nextSlide: function(){
          //  console.log("ok");
         //  }
       });
        $("#section-3 img").each(function(){
          var tmp = "#" + $(this).attr('reveal');
          $(this).mouseenter(function(){
            $("#revealtext").text($(tmp).text());
            $("#revealtext").fadeIn(250);
          });
           $(this).mouseleave(function(){
            $("#revealtext").fadeOut(250);
            $("#revealtext").text("");
          })
        })

  });
// var f = (function(){
//   var oldPos = window.scrollY;
//     function fu(e) {
//         var newPos = window.scrollY;
//         if (newPos>oldPos) {
//           console.log('down');
//         } else if(newPos<oldPos) {
//             console.log('up');
//         } else {
//             console.log('same');
//         }
//         oldPos = newPos;
//     }
//     return fu;  
//   })();



/*Sticky menu script*/
$(document).ready(function() {
  var $window   = $(window),
      height    = $window.height(),
      width     = $window.width(),
      navheight = $('#nav_wrap').height();

  function sticky(){
    var scrollTop = $window.scrollTop();
    if (scrollTop > (height - navheight)) {
      $('#nav_wrap').addClass('sticky');
      $( "#nav_wrap" ).insertBefore( $( ".curtains" ) );
      // $('nav').addClass('nav_animate');
       $('nav').css({
           'width': 70 + '%', 
           'transition':' width .5s'
       });    
      setTimeout(function(){ 
        $('#logo').css({
          'left': 3 + '%', 
          'transition':'.5s'
        });     
        $('#social').css({
          'right': 5 + '%', 
          'transition':'.5s'
        });
      }, 200);
      
    } else {
      $('#nav_wrap').removeClass('sticky');
      $( "#nav_wrap" ).insertAfter( $( ".header" ) ); 
      $('nav').removeClass('nav_animate');
      $('nav').css({
          'width': 100 + '%', 
          'transition':'.5s'
      });
      setTimeout(function(){
        $('#logo').css({
          'left':-150, 
          'transition':'.5s'
        });     
        $('#social').css({
          'right':-150, 
          'transition':'.5s'
        });
      }, 200);
    }
  } 

  $window.on('scroll', sticky); 
 
});

// if (scrollTop > stickyNavTop) { 
//               $("#nav").addClass('sticky');
//                     $( "#nav" ).insertBefore( $( ".curtains" ) );
//           } else {
//               $("#nav").removeClass('sticky');
//                     $( "#nav" ).insertAfter( $( ".header" ) );    
//           }