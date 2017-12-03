import css from './app.scss';

(function($) {

$('.menu-bar').click(function(){
    $('.nav-colapse').toggleClass('open');
    $('.head-text').toggleClass('none');
});



})(jQuery);


