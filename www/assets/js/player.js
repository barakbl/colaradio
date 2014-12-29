window.ytPlayer = null;

function onYouTubeIframeAPIReady() {
    Cola.playFirst();
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        Cola.playNext();
    }
}

function stopVideo() {
    window.ytPlayer.stopVideo();
}