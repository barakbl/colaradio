/**
 * Created by chenasraf on 12/29/14.
 */
$(document).ready(function() {
    $.get('/api/room')
        .done(function(data) {
            if (data.motd.length) {
                $('.well').text(data.motd).show();
            }
        })
    ;
});