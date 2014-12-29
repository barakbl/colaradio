/**
 * Created by chenasraf on 12/29/14.
 */
function Cola() {
    this.apiKey = 'AIzaSyDe9-rzJD8Zdak_LWhhiF6nWSVHIU_BY0I';
    this.songListReady = false;
    this.ytPlayer = null;
    this.playlistId = null;

    this.playFirst = function() {
        if (this.songListReady) {
            var $firstSong = $('.song:first');
            var videoId = this.getVideoIdFromUrl($firstSong.data('videoUrl'));

            this.ytPlayer = new YT.Player('player', {
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
        var $nextSong = $currentSong.next('.song').length ? $currentSong.next('.song') : $('.song:first');
        var videoId = this.getVideoIdFromUrl($nextSong.data('videoUrl'));

        $currentSong.removeClass('playing');
        $nextSong.addClass('playing');

        Cola.ytPlayer.loadVideoById({
            videoId: videoId
        });
    };

    this.playPrevious = function() {
        var $currentSong = $('.song.playing');
        var $nextSong = $currentSong.prev('.song').length ? $currentSong.prev('.song') : $('.song:last');
        console.log($nextSong);
        var videoId = this.getVideoIdFromUrl($nextSong.data('videoUrl'));

        $currentSong.removeClass('playing');
        $nextSong.addClass('playing');

        Cola.ytPlayer.loadVideoById({
            videoId: videoId
        });
    };

    this.addItemToPlaylist = function(options) {
        var url = '/api/playlist/item';
        var $input = $('#pli-search');

        var data = {
            content: 'http://www.youtube.com/watch?v=' + options.song.id,
            playlist_id: this.playlistId,
            type: 'youtube'
        };

        $input.val('');

        $.post(url, data)
            .done(function() {
                $('.playlist-container ul').append(Cola.parseYouTubeApiIntoSong(options.song, true));
                $('.song:hidden').show(300);
            })
        ;
    };

    this.getVideoIdFromUrl = function(url) {
        return url && url.replace(/https?/, '').replace('://www.youtube.com/watch?v=', '') || '';
    };

    this.parseYouTubeApiIntoSong = function(song, hidden) {
        if (typeof hidden === 'undefined') {
            hidden = false;
        }
        var thumbnail = song.snippet.thumbnails.default.url || 'http://www.nefertititokyo.net/wp-content/uploads/2013/10/6556115-ice-cube-droped-in-cola-glass-and-cola-splashing.jpg';

        var videoId = typeof song.id == 'object' ? song.id.videoId : song.id;
        return [
            '<li class="song" data-video-url="' + videoId + '"' + (hidden ? ' style="display: none"' : '') + '>',
                '<div class="song-img" style="background-image: url(\'' + thumbnail + '\')"></div>',
                    '<div class="song-details">',
                    '<div class="song-name">' + song.snippet.title.capitalize() + '</div>',
                '</div>',
            '</li>'
        ].join('\n');
    };
}
window.Cola = new Cola();

function onYouTubeIframeAPIReady() {
    Cola.playFirst();
}