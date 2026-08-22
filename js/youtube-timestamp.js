// Loads the CFCF welcome video via YouTube's IFrame Player API so the
// "jump to 1:10" link seeks the embedded player directly instead of
// opening a new tab to youtube.com.
(function () {
  var mount = document.getElementById('tc-welcome-video');
  var jumpLink = document.getElementById('tc-video-jump');
  if (!mount || !jumpLink) return;

  var player;
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('tc-welcome-video', {
      videoId: 'J-siY7Mf6uM',
      playerVars: { rel: 0 }
    });
  };

  jumpLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (player && typeof player.seekTo === 'function') {
      player.seekTo(70, true);
      player.playVideo();
    }
  });
})();
