$(document).ready(function() {
    var $input = $('#pli-search');
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var data = {
        key: Cola.apiKey,
        part: 'snippet',
        q: '%QUERY',
        maxResults: 9,
        videoEmbeddable: true,
        type: 'video'
    };

    var reqUrl = url + '?' + $.param(data).replace('%25QUERY', '%QUERY');

    var youtubeSuggestions = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 9,
        remote: {
            url: reqUrl,
            filter: function(data) {
                return data.items;
            }
        }
    });

    youtubeSuggestions.initialize();

    $input.typeahead(null, {
        name: 'youtube-suggestions',
        displayKey: 'name',
        source: youtubeSuggestions.ttAdapter(),
        templates: {
            suggestion: function(item) {
                return [
                    '<div class="yt-suggestion">',
                    '<img class="yt-result-thumb" src="' + item.snippet.thumbnails.default.url + '" />',
                    '<span class="yt-result-title">' + item.snippet.title + '</span>',
                    '</div>'
                ].join('\n')
            }
        }
    });

    $input.on('typeahead:selected', function(e, suggestion, dataset) {
        Cola.addItemToPlaylist({
            song: suggestion
        });
    });

});