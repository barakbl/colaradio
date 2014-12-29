/**
 * Created by chenasraf on 12/29/14.
 */
function Cola() {
    this.apiKey = 'AIzaSyDe9-rzJD8Zdak_LWhhiF6nWSVHIU_BY0I';
    this.songListReady = false;
    this.playFirst = function() {
        if (this.songListReady) {
            var $firstSong = $('.song:first');
            var videoId = this.getVideoIdFromUrl($firstSong.data('videoUrl'));

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
        } else {
            setTimeout(function() {
                Cola.playFirst();
            }, 1000);
        }
    };

    this.playNext = function() {
        var $currentSong = $('.song.playing');
        var $nextSong = $currentSong.next('.song') || $('.song:first');
        var videoId = this.getVideoIdFromUrl($nextSong.data('videoUrl'));

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

    this.getVideoIdFromUrl = function(url) {
        return url && url.replace(/https?/, '').replace('://www.youtube.com/watch?v=', '') || '';
    }

    this.parseYouTubeApiIntoSong = function(song) {
        var thumbnail = song.snippet.thumbnails.default.url || 'http://www.nefertititokyo.net/wp-content/uploads/2013/10/6556115-ice-cube-droped-in-cola-glass-and-cola-splashing.jpg';

        return [
            '<li class="song" data-video-url="' + song.id + '">',
                '<div class="song-img" style="background-image: url(\'' + thumbnail + '\')"></div>',
                    '<div class="song-details">',
                    '<div class="song-name">' + song.snippet.title.capitalize() + '</div>',
                '</div>',
            '</li>'
        ].join('\n');
    }
}
window.Cola = new Cola();