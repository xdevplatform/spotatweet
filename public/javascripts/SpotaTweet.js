(function () {

  soundManager.setup({
    useHTML5Audio: true,
    debugMode: false,
    onready: function() {
      getNowPlaying();
    }
  });

  var tweetNowPlaying, sound;

  function getNowPlaying () {
    $.ajax({
      url: '/nowplaying.json',
      success: function(tweet){
        console.log(tweet);

        // check that track is not the same
        if (!tweetNowPlaying || tweetNowPlaying.id_str != tweet.id_str) {

          tweetNowPlaying = tweet;

          $('#tweet-holder').removeClass('fadeInUp');
          $('#tweet-holder').addClass('animated fadeOutDown');
          $('#tweet-holder').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            
            // update background
            $('#background').removeClass('fadeIn');
            $('#background').addClass('animated fadeOut');
            $('#background').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              $('#background').css('background-image', 'url(' + tweet.spotify_track.album.images[2].url + ')');
            });

            // embed tweet
            $('#tweet-holder').html(tweet.oembed.html);
            twttr.widgets.load();
          });

            
          // stop current track, create new track and play it
          if (sound) {
            sound.stop();
          }

          sound = soundManager.createSound({
            url: tweet.spotify_track.preview_url
          });

          sound.play();
        }

        // look for new track after 5 seconds
        setTimeout(function () {
          getNowPlaying();
        }, 10000)
      },
      error: function(err) {
        // try again after 20 seconds
        setTimeout(function () {
          getNowPlaying();
        }, 20000)
      }
    });
  }

  twttr.events.bind('loaded', function () {
    $('#tweet-holder').removeClass('fadeOutDown');
    $('#tweet-holder').addClass('animated fadeInUp');
    $('#tweet-holder').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {     
      $('#background').removeClass('fadeOut');
      $('#background').addClass('animated fadeIn')
    });
  });

})();