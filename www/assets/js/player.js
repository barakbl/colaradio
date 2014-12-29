function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        Cola.playing(true);
        Cola.playNext();
    } else if(event.data == YT.PlayerState.PLAYING) {
        Cola.playing(false);
    } else if(event.data == YT.PlayerState.PAUSED) {
        Cola.playing(true);
    }
}