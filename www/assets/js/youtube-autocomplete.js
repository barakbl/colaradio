$(document).ready(function() {
    var apiKey = 'AIzaSyDe9-rzJD8Zdak_LWhhiF6nWSVHIU_BY0I';
    var $input = $('#pli-search');
    var url = 'http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=%QUERY&key='+apiKey+'&format=5&alt=json&callback=?';

    var youtubeSuggestions = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: url,
            filter: function(data) {
                var items = [];
                for (var item in data[1]) {
                    console.log(data[1][item]);
                    items.push(data[1][item][0]);
                }
                return items;
            }
        }
    });
    youtubeSuggestions.initialize();

    $input.typeahead(null, {
        name: 'youtube-suggestions',
        displayKey: function(data) {
            return data;
        },
        limit: 10,
        source: youtubeSuggestions.ttAdapter()
    });
});