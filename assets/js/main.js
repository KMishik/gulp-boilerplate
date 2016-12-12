(function ($) {
    'use strict';
    $('.totop').on('click', function () {
        $('html, body').animate({scrollTop:0}, 1400);
        return false;
    });
    $('.showdialog').on('click', function () {
        var that = this, target = $(this).data('target');
        $(target).openDialog();
        return false;
    });
} (jQuery));