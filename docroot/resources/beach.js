var dati_beach = {"2003":{"logo":"","squadre":{"open":"16"},"campi":"3","partite":"96","tchoukers":"180"},"2004":{"logo":"","squadre":{"open":"12"},"campi":"3","partite":"62","tchoukers":"109"},"2005":{"logo":"","squadre":{"open":"20","u19":"13","u14":"12"},"campi":"7","partite":"254","tchoukers":"354"},"2006":{"logo":"","squadre":{"open":"28","u19":"20","u14":"11"},"campi":"9","partite":"379","tchoukers":"612"},"2007":{"logo":"r2007.png","squadre":{"open":"35","u19":"28","u14":"13"},"campi":"10","partite":"411","tchoukers":"751"},"2008":{"logo":"r2008.png","squadre":{"slam":"11","open":"30","u19":"22","u14":"13"},"campi":"12","partite":"440","tchoukers":"744"},"2009":{"logo":"r2009.png","squadre":{"slam":"12","open":"45","u19":"26","u14":"12"},"campi":"14","partite":"555","tchoukers":"831"},"2010":{"logo":"r2010.png","squadre":{"slam":"18","open":"62","u19":"35","u14":"11"},"campi":"17","partite":"612","tchoukers":"1069"},"2011":{"logo":"r2011.png","squadre":{"slam":"16","open":"67","u19":"42","u14":"8"},"campi":"18","partite":"741","tchoukers":"1121"},"2012":{"logo":"r2012.png","squadre":{"slam":"17","open":"76","u19":"47","u14":"11"},"campi":"19","partite":"714","tchoukers":"1272"}};
var dati_beach_fondo_scala = {
    'squadre': 151,
    'campi': 19,
    'partite': 741,
    'tchoukers': 1272
};


function loadBeachStats(anno) {

    var squadre = 0;
    for (var s in dati_beach[anno]['squadre']) {
        squadre += parseInt(dati_beach[anno]['squadre'][s], 10);
    };
    var squadre_width = squadre / dati_beach_fondo_scala['squadre'] * 100;
    $('.beach_stats #squadre').html(squadre).css({'width':squadre_width+'%'});
    var campi = dati_beach[anno]['campi'];
    var campi_width = campi / dati_beach_fondo_scala['campi'] * 100;
    $('.beach_stats #campi').html(campi).css({'width':campi_width+'%'});
    var partite = dati_beach[anno]['partite'];
    var partite_width = partite / dati_beach_fondo_scala['partite'] * 100;
    $('.beach_stats #partite').html(partite).css({'width':partite_width+'%'});
    var tchoukers = dati_beach[anno]['tchoukers'];
    var tchoukers_width = tchoukers / dati_beach_fondo_scala['tchoukers'] * 100;
    $('.beach_stats #tchoukers').html(tchoukers).css({'width':tchoukers_width+'%'});
}

function loadYear(anno) {
    loadBeachStats(anno);
    $('.beach_scrollable .active').removeClass('active');
    $('.beach_scrollable [rel="' + anno + '"]').addClass('active');
    $('.beach_stats h2 span').text(anno);
    currentYear = $('.beach_scrollable .active');
    if (currentYear.next().length == 0) {
        $('.beach_stats .next').css('visibility', 'hidden');
    } else {
        $('.beach_stats .next').css('visibility', 'visible');
    }
    if (currentYear.prev().length == 0) {
        $('.beach_stats .prev').css('visibility', 'hidden');
    } else {
        $('.beach_stats .prev').css('visibility', 'visible');
    }
    if (currentYear.attr('data-color-foreground')) {
        $('.beach_stats h2, .beach_stats h3').css('color', currentYear.attr('data-color-foreground'));
    } else {
        $('.beach_stats h2, .beach_stats h3').css('color', '#011D67');
    }
    if (currentYear.attr('data-color-background')) {
        $('.beach_stats .isto').css('background-color', currentYear.attr('data-color-background'));
        $('.beach_stats .nav').css('color', currentYear.attr('data-color-background'));
    } else {
        $('.beach_stats .isto').css('background-color', '#E85600');
        $('.beach_stats .nav').css('color', '#E85600');
    }

}


(function($){

    $(document).ready(function(){
        var prev = $('<a class="nav prev">&lt;</a> ');
        prev.click(function(){
            var prev = $('.beach_scrollable .active').prev().attr('rel');
            loadYear(prev);
        });
        var next = $(' <a class="nav next">&gt;</a>');
        next.click(function(){
            var next = $('.beach_scrollable .active').next().attr('rel');
            loadYear(next);
        });
        $('.beach_stats h2').prepend(prev);
        $('.beach_stats h2').append(next);
        var current = $('.beach_scrollable .active').attr('rel');
        loadYear(current);

    });

})(jQuery);