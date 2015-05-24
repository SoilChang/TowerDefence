$(document).ready(function(){

  $('#img').hover(
    function(){
        $(this).addClass('hightlight');
    },
    function(){
        $(this).removeClass('hightlight');
    }
  );

});