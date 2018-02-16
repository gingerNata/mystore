/* --------------------------------------------- 
 * Filename:     custom.js
 * Version:      1.0.0 (2016-03-05)
 * Website:      http://www.zymphonies.com
 * Description:  Global Script
 * Author:       Zymphonies Team
 info@zymphonies.com
 -----------------------------------------------*/

jQuery(document).ready(function ($) {

    $('.flexslider').flexslider({
        animation: "slide"
    });

    //Main menu
    $('#main-menu').smartmenus();

    //Mobile menu toggle
    $('.navbar-toggle').click(function () {
        $('.region-primary-menu').slideToggle();
    });


    //Mobile dropdown menu
    if ($(window).width() < 767) {
        $(".region-primary-menu li a:not(.has-submenu)").click(function () {
            $('.region-primary-menu').hide();
        });
    }

});
(function ($) {
    Drupal.behaviors.main = {

        attach: function (context, settings) {

            var delay = 1500, setTimeoutConst;

                $('.user-icon').mouseover(function () {
                $('.sub-menu').show();
            }).mouseout(function () {
                 setTimeoutConst = setTimeout(function() {
                     $('.sub-menu').hide();
                 }, delay)
            });
        }
    }
})(jQuery);