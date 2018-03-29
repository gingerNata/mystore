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
(function ($) {
    Drupal.behaviors.product_custom = {

        attach: function (context, settings) {

            if(!$('.path-product .form-item-quantity-0-value').hasClass('with-buttons')) {
                jQuery('<div class="quantity-button quantity-down">-</div>')
                    .insertBefore('.path-product .js-form-type-number input');
                jQuery('<div class="quantity-button quantity-up">+</div>')
                    .insertAfter('.path-product .js-form-type-number input');
                $('.path-product .form-item-quantity-0-value').addClass('with-buttons');
            }
            jQuery('.js-form-type-number').each(function() {
                var spinner = jQuery(this),
                    input = spinner.find('input[type="number"]'),
                    btnUp = spinner.find('.quantity-up'),
                    btnDown = spinner.find('.quantity-down'),
                    min = input.attr('min'),
                    max = input.attr('max');

                btnUp.click(function() {
                    var oldValue = parseFloat(input.val());
                    if (oldValue >= max) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue + 1;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                });

                btnDown.click(function() {
                    var oldValue = parseFloat(input.val());
                    if (oldValue <= min) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue - 1;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                });

            });

        }
    }
})(jQuery);

(function ($) {
    Drupal.behaviors.product_color = {

        attach: function (context, settings) {

            var colorBlock = $('#block-kolir .facet-item__value');
            colorBlock.each(function (index) {
                $(this).css('background-color', '#' + $(this).text());
            });
            var colorBlock = $('#block-kolir1 .facet-item__value');
            colorBlock.each(function (index) {
                $(this).css('background-color', '#' + $(this).text());
            });
        }
    }
})(jQuery);