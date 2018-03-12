(function ($) {
    Drupal.behaviors.blockRefresh = {
        attach: function (context, settings) {
            $('.wishlist-button').once().click(function (element) {
                element.target.innerText = Drupal.t('In wishlist', {}, {context: "Wishlist button after click"});
                $(this).addClass('added');
            });

        }
    }
}(jQuery));
