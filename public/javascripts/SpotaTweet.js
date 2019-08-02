(function () {

  var tweetHolderEl, tweetNowPlaying, sound;

  soundManager.setup({
    useHTML5Audio: true,
    debugMode: false,
    onready: function () {
      tweetHolderEl = $('#tweet-holder');
      backgroundEl = $('#background');
      getNowPlaying();
    }
  });

  function getNowPlaying() {
    $.ajax({
      url: '/nowplaying.json',
      success: function (tweet) {

        if (!tweet.spotify_track) {
          tryAgain();
          return;
        }

        // check that track is not the same
        if (!tweetNowPlaying || tweetNowPlaying.id_str != tweet.id_str) {

          tweetNowPlaying = tweet;

          tweetHolderEl.removeClass('fadeInUp');
          tweetHolderEl.addClass('animated fadeOutDown');
          tweetHolderEl.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

            // update background
            backgroundEl.removeClass('fadeIn');
            backgroundEl.addClass('animated fadeOut');
            backgroundEl.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              backgroundEl.css('background-image', 'url(' + tweet.spotify_track.body.album.images[2].url + ')');
            });

            // embed tweet
            tweetHolderEl.html(tweet.oembed.html);
            twttr.widgets.load();
          });

          // stop current track, create new track and play it
          if (sound) {
            sound.stop();
          }

          sound = soundManager.createSound({
            url: tweet.spotify_track.body.preview_url
          });

          sound.play();
        }

        // look for new track after 5 seconds
        setTimeout(function () {
          getNowPlaying();
        }, 10000)
      },
      error: function (err) {
        // try again after 20 seconds
        setTimeout(function () {
          getNowPlaying();
        }, 20000)
      }
    }).error(function (e) {
      tryAgain();
    });
  }

  function tryAgain() {
    setTimeout(function () {
      getNowPlaying();
    }, 1500)
  }

  twttr.events.bind('loaded', function () {
    tweetHolderEl.removeClass('fadeOutDown');
    tweetHolderEl.addClass('animated fadeInUp');
    tweetHolderEl.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      backgroundEl.removeClass('fadeOut');
      backgroundEl.addClass('animated fadeIn')
    });
  });

})();
