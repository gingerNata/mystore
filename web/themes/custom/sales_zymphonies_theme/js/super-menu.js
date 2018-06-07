(function ($) {
    Drupal.behaviors.second = {

        attach: function (context, settings) {

            hideAllDown();

            var menu = $('#block-categorymenu .mhierarchical-taxonomy-menu');
            var permanent_link = $('#block-categorymenu .mhierarchical-taxonomy-menu .menu-item--expanded.permanent');
            var allPermanent_link = $('#block-categorymenu .mhierarchical-taxonomy-menu .permanent');
            var exp_perm_link = $('#block-categorymenu .mhierarchical-taxonomy-menu a.permanent');

            exp_perm_link.click(function () {
                // event.preventDefault();
            })
                .dblclick(function() {
                    window.location = this.href;
                    return false;
            });

            //close on out click
            $(document).click(function (e) {
                var $target = $(event.target);
                if (!$target.parents().is("#block-categorymenu .mhierarchical-taxonomy-menu")
                    && !$target.is("#block-categorymenu .mhierarchical-taxonomy-menu") && menu.hasClass('open')) {

                    permanent_link.removeClass('selected');

                    hideAllDown();
                    menu.toggleClass('open');
                }
            });

            //on click open menu
            permanent_link.unbind('click').click(function (ff) {

                var target = $(event.target);

                menu.toggleClass('open');

                if(menu.hasClass('open')) {

                    showDown(this);
                    $('.sub-rubric').show().html($(this).find('.sub-menu-left :first-child .sub-menu-right').html());
                    $(this).find('.sub-menu-left li:first-child').addClass('selected');
                    $(this).addClass('selected');


                    $('.mhierarchical-taxonomy-menu.open .permanent').on( "mouseenter", function (e) {
                        if(menu.hasClass('open')) {
                            $('.sub-rubric').show().html($(this).find('.sub-menu-left :first-child .sub-menu-right').html());
                            showDown(this);

                            allPermanent_link.removeClass('selected');
                            $(this).addClass('selected');
                            $(this).find('.sub-menu-left li:first-child').addClass('selected');
                        }
                        else {
                            e.stopPropagation();
                        }
                    })
                }
                else if (target.hasClass('tmp')){
                    console.log(target);
                    window.location = target[0].href;
                }

                else {
                    permanent_link.removeClass('selected');
                    hideAllDown();
                }
                // console.log(target);
                return false;

            });


            function showDown(el) {
                hideAllDown();
                $(el).find('.sub-menu-left').show();
                $('.sub-rubric').show();

                setHeight(el);
                showRightBlock(el);
            }

            function showRightBlock(el) {

                //on mouse over left menu item
                $(el).find(".menu-item").mouseover(function () {
                    $('.sub-menu-left li').removeClass("selected");
                    $(this).addClass("selected");

                    var subContent = $(this).find('.sub-menu-right');

                    $('.sub-rubric').empty().show().html(subContent.html());
                })
            }

            function hideAllDown() {
                $('.sub-menu-left').hide();
                $('.sub-menu-right').hide();
                $('.sub-rubric').hide();
            }

            //todo
            function setHeight(el) {
                var leftHeight = $(el).find('.sub-menu-left').height();
                if (leftHeight) {
                    $('.sub-rubric').height(leftHeight)
                }
                else {
                    $('.sub-rubric').hide();
                }
            }
        }
    }
})(jQuery);
