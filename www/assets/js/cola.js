/**
 * Created by chenasraf on 12/29/14.
 */
function Cola() {

    this.playFirst = function() {
        var $firstSong = $('.song:first');
        var videoId = getVideoIdFromUrl($firstSong.data('videoUrl'));

        window.ytPlayer = new YT.Player('player', {
            height: 300,
            width: 550,
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        $firstSong.addClass('playing');
    };

    this.playNext = function() {
        var $currentSong = $('.song.playing');
        var $nextSong = $currentSong.next('.song') || $('.song:first');
        var videoId = getVideoIdFromUrl($nextSong.data('videoUrl'));

        $currentSong.removeClass('playing');
        $nextSong.addClass('playing');

        window.ytPlayer.loadVideoById({
            videoId: videoId
        });
    };
    this.playPrevious = function() {
        var $currentSong = $('.song.playing');
        var $nextSong = $currentSong.prev('.song') || $currentSong;
        var videoId = getVideoIdFromUrl($nextSong.data('videoUrl'));

        $currentSong.removeClass('playing');
        $nextSong.addClass('playing');

        window.ytPlayer.loadVideoById({
            videoId: videoId
        });
    };

    this.addItemToPlaylist = function(options) {
        var url = '/playlists/item/add';
        var data = {
            content: 'http://www.youtube.com/watch?v=' + options.id,
            room_id: options.room_id
            // TODO: add use auth stuff
        };

        $.post(url, data)
            .done(function() {

            })
        ;
    };

    function getVideoIdFromUrl(url) {
        return url && url.replace(/https?/, '').replace('://www.youtube.com/watch?v=', '') || '';
    }
}
window.Cola = new Cola();