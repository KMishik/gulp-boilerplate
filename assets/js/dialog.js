(function ($) {
    'use strict';
    $('.dialog-box.overlay').on('click', function (e) {
        $(this).find('.dialog .closer').trigger('click');
    });
    $('.dialog').on('click', function (e) {
        e.stopPropagation();
    });
    $('.dialog .closer').on('click', function () {
        var that = this;
        $(that).closest('.dialog-box').removeClass('active');
        setTimeout(function () {
            $(that).closest('.dialog-box').hide();
        }, 1000);
        return false;
    });
    $.fn.openDialog = function () {
        return this.each(function () {
            var that = this;
            $(that).show();
            setTimeout(function () {
                $(that).addClass('active');
            }, 300);
        });
    }
} (jQuery));