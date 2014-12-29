$(document).ready(function() {
    var apiKey = 'AIzaSyDe9-rzJD8Zdak_LWhhiF6nWSVHIU_BY0I';
    var $input = $('#pli-search');
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var data = {
        key: apiKey,
        part: 'snippet',
        q: '%QUERY',
        maxResults: 9
    };

    var reqUrl = url + '?' + $.param(data).replace('%25QUERY', '%QUERY');

    var youtubeSuggestions = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: reqUrl,
            filter: function(data) {
                var items = [];
                console.log(data);
                for (var i in data.items) {
                    var item = data.items[i];
                    // item.id.videoId
                    // item.snippet.title
                    // item.snippet.channelTitle
                    // item.snippet.channelId
                    // item.snippet.thumbnails.high.url
                    items.push({
                        id: item.id.videoId,
                        thumbnail: item.snippet.thumbnails.default.url,
                        title: item.snippet.title
                    });
                }
                return items;
            }
        }
    });

    youtubeSuggestions.initialize();

    $input.typeahead(null, {
        name: 'youtube-suggestions',
        displayKey: 'value',
        limit: 9,
        source: youtubeSuggestions.ttAdapter(),
        templates: {
            suggestion: function(item, b, c) {
                console.log([item, b, c]);
                console.log(this);
                return [
                    '<div class="yt-suggestion">',
                    '<img src="' + item.thumbnail + '" />',
                    item.title,
                    '</div>'
                ].join('\n')
            }
        }
    });

    $input.on('typeahead:selected', function() {
        $('#search').trigger('submit');
    });

    $('#search').submit(function(e) {
        e.preventDefault();

        //var url = '/data/playlist/insert';
        //var data = {
        //    key: apiKey,
        //    part: 'snippet',
        //    q: $input.val(),
        //    maxResults: 9
        //};
        //
        //$.get(url, data)
        //    .done(function(data) {
        //        if (data.items.length > 0) {
        //            $.each(data.items, function (i, item) {
        //                console.log('http://www.youtube.com/watch?v=' + item.id.videoId);
        //            });
        //        }
        //    })
        //;

    });

});