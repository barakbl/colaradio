function onYouTubePlayerReady(playerId) {
    ytplayer = $("#myytplayer");
}
$(document).ready(function() {
    var apiKey = 'AIzaSyDe9-rzJD8Zdak_LWhhiF6nWSVHIU_BY0I';
    if (ytplayer) {
        ytplayer.playVideo();
    }
});