/**
 * Created by chenasraf on 12/29/14.
 */
function Cola() {
    this.apiKey = 'AIzaSyDe9-rzJD8Zdak_LWhhiF6nWSVHIU_BY0I';
    this.songListReady = false;
    this.ytPlayer = null;
    this.playlistId = null;
    this.statsInterval = null;
    this.playFirst = function() {
        if (this.songListReady) {
            var $firstSong = $('.song:not(.disabled):first');
            var videoId = this.getVideoIdFromUrl($firstSong.data('videoUrl'));

            var options = {
                height: 300,
                width: 550,
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                },
                playerVars: {}
            };

            var stats = Cola.getStats();
            if (stats) {
                options.videoId = stats.id;
                options.playerVars.start = parseInt(stats.time);

                $('.song.playing').removeClass('playing');

                var $savedVideo = $('.song[data-video-url*=' + stats.id + ']:not(.disabled):first');
                if ($savedVideo.length) {
                    $savedVideo.addClass('playing');
                } else {
                    $firstSong.addClass('playing');
                }

            } else {
                $firstSong.addClass('playing');
            }

            this.ytPlayer = new YT.Player('player', options);

            Cola.setStats();
        } else {
            setTimeout(function() {
                Cola.playFirst();
            }, 1000);
        }
    };

    this.playSelectedVideo = function($nextSong) {
        var $currentSong = $('.song.playing');
        if ($currentSong[0] == $nextSong[0]) {
            return Cola.toggle();
        }
        var videoId = this.getVideoIdFromUrl($nextSong.data('videoUrl'));

        $currentSong.removeClass('playing');
        $nextSong.addClass('playing');
        Cola.ytPlayer.loadVideoById({
            videoId: videoId
        });
        Cola.playing(true);
    };

    this.playNext = function() {
        var $currentSong = $('.song.playing');
        var $nextSong = $currentSong.nextAll('.song:not(.disabled):first').length ? $currentSong.nextAll('.song:not(.disabled):first') : $('.song:not(.disabled):first');
        var videoId = this.getVideoIdFromUrl($nextSong.data('videoUrl'));

        $currentSong.removeClass('playing');
        $nextSong.addClass('playing');

        Cola.ytPlayer.loadVideoById({
            videoId: videoId
        });
        Cola.playing(true);
    };

    this.playPrevious = function() {
        var $currentSong = $('.song.playing');
        var $nextSong = $currentSong.prevAll('.song:not(.disabled):first').length ? $currentSong.prevAll('.song:not(.disabled):first') : $('.song:not(.disabled):last');
        var videoId = this.getVideoIdFromUrl($nextSong.data('videoUrl'));

        $currentSong.removeClass('playing');
        $nextSong.addClass('playing');

        Cola.ytPlayer.loadVideoById({
            videoId: videoId
        });
        Cola.playing(true);
    };

    this.addItemToPlaylist = function(options) {
        var url = '/api/playlist/item';
        var $input = $('#pli-search');

        var videoId = this.getVideoIdFromApiItem(options.song);

        var data = {
            content: 'http://www.youtube.com/watch?v=' + videoId,
            playlist_id: this.playlistId,
            type: 'youtube'
        };

        $input.val('');

        $.post(url, data)
            .done(function(newSong) {

                if (typeof newSong !== 'object')
                    newSong = JSON.parse(newSong);

                if (newSong.hasOwnProperty('0'))
                    newSong = newSong[0];

                var $playlistContainer = $('.playlist-container');
                $playlistContainer.find('ul').append(Cola.parseYouTubeApiIntoSong(newSong, options.song, true));
                $('.song:hidden').show();
                $playlistContainer.animate({scrollTop: ($playlistContainer[0].scrollHeight - $playlistContainer.height())}, 1000, 'easeInOutQuart')
            })
        ;
    };

    this.getVideoIdFromUrl = function(url) {
        return url && url.replace(/https?/, '').replace('://www.youtube.com/watch?v=', '') || '';
    };

    this.parseYouTubeApiIntoSong = function(api, song, hidden) {
        if (typeof hidden === 'undefined') {
            hidden = false;
        }
        var thumbnail = song.snippet.thumbnails.default.url || 'http://www.nefertititokyo.net/wp-content/uploads/2013/10/6556115-ice-cube-droped-in-cola-glass-and-cola-splashing.jpg';

        var videoId = this.getVideoIdFromApiItem(song);
        return [
            '<li class="song"',
            'data-video-id="' + api.id + '"',
            'data-video-user-id="' + api.user_id + '"',
            'data-video-url="' + videoId + '"' + (hidden ? ' style="display: none"' : '') + '>',
            '<span class="song-delete glyphicon glyphicon-remove"></span>',
            '<span class="song-undelete glyphicon glyphicon-plus"></span>',
            '<div class="song-img" style="background-image: url(\'' + thumbnail + '\')"></div>',
            '<div class="song-details">',
            '<div class="song-name">' + song.snippet.title.capitalize() + '</div>',
            '</div>',
            '</li>'
        ].join('\n');
    };

    this.getVideoIdFromApiItem = function(item) {
        return typeof item.id == 'object' ? item.id.videoId : item.id;
    };

    this.playing = function(state) {
        var $button = $('.controller.status');
        if (typeof state === 'undefined') {
            return $button.hasClass('play');
        }
        if(state) {
            $button.addClass('pause').removeClass('play');
        }  else {
            $button.addClass('play').removeClass('pause');
        }
    };

    this.pause = function() {
        Cola.ytPlayer.pauseVideo();
        Cola.playing(false);
    };

    this.play = function() {
        Cola.ytPlayer.playVideo();
        Cola.playing(true);
    };

    this.toggle = function() {
        if (Cola.playing()) {
            Cola.pause();
        } else {
            Cola.play();
        }
    };

    this.setStats = function() {
        Cola.statsInterval = window.setInterval(function() {
            if (typeof Cola.ytPlayer === 'object' && Cola.ytPlayer.hasOwnProperty('getCurrentTime')) {
                var date = new Date();
                var expiry = date.setDate(date.getDate() + 7);
                document.cookie = 'video_id=' + $('.song.playing').data('videoUrl') + '; expires=' + expiry;
                document.cookie = 'video_time=' + Cola.ytPlayer.getCurrentTime();
            }
        }, 1000);
    };

    this.getStats = function() {
        if (getCookie('video_id') && getCookie('video_time')) {
            return {
                id: getCookie('video_id'),
                time: getCookie('video_time')
            };
        }
        return null;
    };
}
window.Cola = new Cola();

function onYouTubeIframeAPIReady() {
    Cola.playFirst();
}