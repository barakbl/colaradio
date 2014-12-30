/**
 * Created by chenasraf on 12/29/14.
 */
$(document).ready(function() {
    $.getJSON('/api/playlist')
        .done(function(apiData) {

            $('#well').text(apiData.room.motd).show(300);

            Cola.playlistId = apiData.id;
            var videoIds = [], internalIds = [];
            for (var j in apiData.items) {
                internalIds.push(apiData.items[j].id);
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
                        $('.playlist-container ul').append(function() {
                            return Cola.parseYouTubeApiIntoSong(internalIds[i], data.items[i]);
                        });
                    }
                    Cola.songListReady = true;
                })
            ;
        })
    ;
    $('.playlist-container').on('click', '.song', function() {
        Cola.playSelectedVideo($(this));
    });

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