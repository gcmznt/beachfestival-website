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
    }
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
    if (currentYear.next().length === 0) {
        $('.beach_stats .next').css('visibility', 'hidden');
    } else {
        $('.beach_stats .next').css('visibility', 'visible');
    }
    if (currentYear.prev().length === 0) {
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



function addMarker(map, point, image, title, infoWindowContent, zIndex) {
    zIndex = zIndex || 1;
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        draggable: false,
        icon: image,
        title: title,
        zIndex: zIndex
    });
    if (infoWindowContent !== undefined) {
        var infowindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 300
        });
        google.maps.event.addListener(marker, 'open', function() {
            infowindow.open(map, marker);
        });
    }

    return marker;
}

var places = [
    // {'type': 'main', 'lat': 44.088522, 'lon': 12.536774, 'name': 'Piazza'},
    // {'type': 'market', 'lat': 44.088559, 'lon': 12.536345, 'name': 'Market'},
    // {'type': 'hotel', 'lat': 44.089641, 'lon': 12.535956, 'name': 'Hotel Roma Spiaggia'},
    // {'type': 'hotel', 'lat': 44.089063, 'lon': 12.536869, 'name': 'Hotel Suprem'},
    // {'type': 'hotel', 'lat': 44.086744, 'lon': 12.53913, 'name': 'Albergo Verdemare'},
    {'type': 'beach', 'lat': 44.088140, 'lon': 12.53893, 'name': 'Playa Tamarindo'}
];
var markers = {
    'hotel': new google.maps.MarkerImage(
        '/resources/ico_home.png',
        new google.maps.Size(32, 32),
        new google.maps.Point(0,0),
        new google.maps.Point(16, 26),
        new google.maps.Size(32, 32)
    ),
    'market': new google.maps.MarkerImage(
        '/resources/ico_shop.png',
        new google.maps.Size(32, 32),
        new google.maps.Point(0,0),
        new google.maps.Point(16, 26),
        new google.maps.Size(32, 32)
    ),
    'main': new google.maps.MarkerImage(
        '/resources/ico_star.png',
        new google.maps.Size(32, 32),
        new google.maps.Point(0,0),
        new google.maps.Point(16, 26),
        new google.maps.Size(32, 32)
    ),
    'beach': new google.maps.MarkerImage(
        '/resources/ico_sun.png',
        new google.maps.Size(32, 32),
        new google.maps.Point(0,0),
        new google.maps.Point(16, 26),
        new google.maps.Size(32, 32)
    )
};

function load() {
    var options = {
        scrollwheel: false,
        zoom: 15,
        center: new google.maps.LatLng(44.089341, 12.53646),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        navigationControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), options);
    var point,
        points = new google.maps.LatLngBounds();

    
    for (var i = places.length - 1; i >= 0; i--) {
        
        point = new google.maps.LatLng(places[i]['lat'],places[i]['lon']);
        points.extend(point);
        var newMark = addMarker(
            map,
            point,
            markers[places[i]['type']],
            places[i]['name'],
            '<div>' + places[i]['name'] + '</div>',
            100
        );

        var listEl = $('<li><a href="#">' + places[i]['name'] + '</a></li>');
        listEl.data('marker', newMark);
        listEl.find('a').click(function(){
            var newMarkinner = $(this).parent().data('marker');
            google.maps.event.trigger(newMarkinner, 'open');
            return false;
        });
        $('.places[rel="' + places[i]['type'] + '"]').append(listEl);

    }

    // map.fitBounds(points);
}




$(document).ready(function(){
    load();

    // if the function argument is given to overlay,
    // it is assumed to be the onBeforeLoad event listener
    $("a.play[rel]").overlay({
        mask: '#000',
        onBeforeLoad: function(e) {
            var wrap = this.getOverlay().find(".contentWrap");
            var target = e.target || e.srcElement;
            wrap.html('<iframe width="640" height="480" src="/video/?v=' + $(target).attr('data-video') + '" frameborder="0"></iframe>');
        },
        onClose: function() {
            var wrap = this.getOverlay().find(".contentWrap");
            wrap.empty();
        }
    });

    $('[name]').focus(function(){
        $(this).removeClass('error');
    });

    $('#joinstaff .submit').click(function(){
        var form = $('#joinstaff');
        var error = false;

        form.find('[required]').each(function(){
            if($(this).val() === '') { error = true; $(this).addClass('error'); }
        });

        if(!error) {
            $.ajax({
                url: '/send_mail.php',
                data: form.serialize(),
                type: 'post',
                success: function(data) {
                    if(data === '1') {
                        form.find('.submit').text('Thank you!');
                    }
                }
            });
        }
        return false;
    });

    $('.scrollPage').click(function() {
        var elementClicked = $(this).attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-20}, 500 );
        return false;
    });

});