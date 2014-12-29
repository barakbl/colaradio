/**
 * Created by chenasraf on 12/29/14.
 */
function Cola() {
    this.addItemToPlaylist = function(options) {
        var url = '/playlists/item/add';
        var data = {
            content: 'http://www.youtube.com/watch?v=' + options.id,
            room_id: options.room_id
            // TODO: add use auth stuff
        };

        console.log("Added: ");

        $.post(url, data)
            .done(function() {

            })
        ;
    };
}