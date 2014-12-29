/**
 * Created by chenasraf on 12/29/14.
 */
$(document).ready(function() {
    $.getJSON('/api/playlist/')
        .done(function(apiData) {
            var params = {
                id: function() {
                    var ids = [];
                    for (var j in apiData.items) {
                        ids.push(Cola.getVideoIdFromUrl(apiData.items[j].content))
                    }
                    return ids.join(',');
                },
                key: Cola.apiKey,
                part: 'snippet'
            };

            $.getJSON('https://www.googleapis.com/youtube/v3/videos', params)
                .done(function(data) {
                    for (var i in data.items) {
                        var song = data.items.hasOwnProperty(i) && data.items[i];
                        $('.playlist-container ul').append(function() {
                            return Cola.parseYouTubeApiIntoSong(song);
                        });
                    }
                    Cola.songListReady = true;
                })
            ;
        })
    ;
});