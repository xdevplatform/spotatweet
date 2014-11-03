var express = require('express');
var router = express.Router();
var fs = require('fs');
var nconf = require('nconf');
var Twit = require('twit');
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyUtils = require('../utils/spotify-utils');
var _ = require('lodash');

nconf.file({ file: 'config.json' }).env();

var spotify = new SpotifyWebApi({
  clientId : nconf.get('SPOTIFY_CLIENT_ID'),
  clientSecret : nconf.get('SPOTIFY_CLIENT_SECRET')
});

var twitter = new Twit({
  consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
  access_token: nconf.get('TWITTER_ACCESS_TOKEN'),
  access_token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
});

var tweetStream;

function start () {

  // request spotify access token
  spotify.clientCredentialsGrant().then(function(data) {
    console.log('Access Token: ' + data['access_token']);
    console.log('Expires in: ' + data['expires_in']);

    spotify.setAccessToken(data['access_token']);

    // attach to tweet stream and filter for #NowPlaying
    if (tweetStream) {
      tweetStream.start();
    } else {
      tweetStream = twitter.stream('statuses/filter', { track: '#NowPlaying' });
      
      tweetStream.on('tweet', function (tweet) {
        onTweet(tweet);
      });
    }

  }, function(err) {
    console.log('Access token request failed: ', err);
  });
}

function restart () {
  tweetStream.stop();
  start();
}

function onTweet (tweet) {

  var spotifyTrackId;

  // find a spotify url
  _.forEach(tweet.entities.urls, function(url) {
    
    // do we have a spotify url
    if ( spotifyUtils.isSpotifyUrl(url.expanded_url) ) {

      // if full url get the track id
      if ( spotifyUtils.isFullUrl(url.expanded_url) ) {
        getSpotifyTrack(tweet, url.expanded_url);
      }

      // else get the full url from the short url
      else {
        spotifyUtils.getFullUrl(url.expanded_url, function (err, fullUrl) {
          if (!err && allowApiRequest) {
            getSpotifyTrack(tweet, fullUrl);
          }
        });
      }

      // end loop
      return false;
    }
  });
}

function getSpotifyTrack (tweet, spotifyUrl) {

  // make sure the url contains a track id
  if ( !spotifyUtils.isTrackUrl(spotifyUrl) ) {
    return;
  }

  allowApiRequest = false;

  var trackId = spotifyUtils.getTrackIdFromUrl(spotifyUrl);

  // get track data from spotify api
  spotify.getTrack(trackId).then(function (trackData) {
    tweet.spotify_track = trackData;
    getTwitterData(tweet);
  }, function(err) {
    console.log('Track request failed: ', err);
    if (err.error && err.error.status == 401) {
      setTimeout(function () {
        allowApiRequest = true;
        start();
      }, 5000);
    }
  });
}

function getTwitterData (tweet) {

  twitter.get('statuses/oembed', { "id": tweet.id_str, "maxwidth": 440, "hide_thread": true, "omit_script": true }, function (err, data, resp) {
    
    console.log('tweet.id_str:', tweet.id_str);
    tweet.oembed = data;
    saveTweet(err, tweet);
  });
}

var allowApiRequest = true, tweetNowPlaying = {};

function saveTweet (err, tweet) {

  tweetNowPlaying = tweet;

  // try to stay within rate limtis and open window in 10 seconds
  setTimeout(function () {
    allowApiRequest = true;
  }, 10000);
}

start();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    ga_tracking_id: nconf.get('GA_TRACKING_ID')
  });
});

/* GET now playing json */
router.get('/nowplaying.json', function(req, res) {
  res.send(tweetNowPlaying);
});

module.exports = router;
