/**
 * Created by chenasraf on 12/29/14.
 */
$(document).ready(function() {
    $.getJSON('/api/playlist')
        .done(function(apiData) {

            $('#motd').text(apiData.room.motd).show(300);
            $('#loading-playlist').slideUp(300);

            Cola.playlistId = apiData.id;
            var videoIds = [];
            for (var j in apiData.items) {
                videoIds.push(Cola.getVideoIdFromUrl(apiData.items[j].content))
            }
            var params = {
                id: videoIds.join(','),
                key: Cola.apiKey,
                part: 'snippet'
            };

            $.getJSON('https://www.googleapis.com/youtube/v3/videos', params)
                .done(function(data) {
                    for (var i in data.items) {
                        $('.playlist-container ul').append(Cola.parseYouTubeApiIntoSong(apiData.items[i], data.items[i]));
                    }
                    Cola.songListReady = true;
                    $('.playlist-container .list').slideDown(1000);
                })
            ;
        })
    ;
    $('.playlist-container')
        .on('click', '.song:not(.disabled)', function() {
            Cola.playSelectedVideo($(this));
        })
        .on('click', '.song-delete', function(e) {
            e.stopPropagation();

            var $song = $(this).closest('.song');
            if (window.userId == parseInt($song.data('userId'))) {
                var apiVideoId = $song.data('id');
                $.ajax('/api/playlist/item', {
                    method: 'DELETE',
                    data: {
                        id: apiVideoId
                    }
                })
                    .done(function () {
                        $song.slideUp(400).fadeOut(300);
                    });
            } else {
                $song.addClass('disabled');
                var songInfos = window.localStorage.getObject(Cola.songInfoObjectName) || {};
                if (!songInfos[$song.data('videoId')])
                    songInfos[$song.data('videoId')] = {};
                songInfos[$song.data('videoId')].deleted = true;
                window.localStorage.setObject(Cola.songInfoObjectName, songInfos);
                Delet
                $song.find('.song-delete').fadeOut(200, function() {
                    $song.find('.song-undelete').fadeIn(200);
                })
            }
        })
        .on('click', '.song-undelete', function(e) {
            e.stopPropagation();

            var $song = $(this).closest('.song');
            $song.removeClass('disabled');

            var songInfos = window.localStorage.getObject(Cola.songInfoObjectName) || {};
            if (!songInfos[$song.data('videoId')])
                songInfos[$song.data('videoId')] = {};
            songInfos[$song.data('videoId')].deleted = false;
            window.localStorage.setObject(Cola.songInfoObjectName, songInfos);

            $song.find('.song-undelete').fadeOut(200, function() {
                $song.find('.song-delete').fadeIn(200);
            })
        })
    ;

    //Controllers
    $('.controller.next').on('click',function() {
        Cola.playNext();
    });
    $('.controller.pre').on('click',function() {
        Cola.playPrevious();
    });
    $('.controllers-container').on('click','.play',function() {
        Cola.pause();
    });
    $('.controllers-container').on('click','.pause',function() {
        Cola.play();
    });
});