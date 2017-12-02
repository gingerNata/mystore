(function ($) {
    Drupal.behaviors.blockRefresh = {
        attach: function (context, settings) {
            jQuery('.wishlist-button').once().click(function (element) {
                element.target.innerText = Drupal.t('In wishlist', {}, {context: "Wishlist button after click"});
                console.log(element.target);
            });

        }
    }
}(jQuery));