var url = require("url");
var request = require('request');

SpotifyUtils = { };

var FULL_HOSTNAME = 'open.spotify.com';
var SHORT_HOSTNAME = 'spoti.fi';

SpotifyUtils.isTrackUrl = function (spotifyUrl) {
  return spotifyUrl.indexOf('track') > -1;
}

SpotifyUtils.getTrackIdFromUrl = function (spotifyUrl) {
  return spotifyUrl.substr(spotifyUrl.lastIndexOf('/') + 1);
}

SpotifyUtils.isFullUrl = function (spotifyUrl) {
  return url.parse(spotifyUrl).hostname === FULL_HOSTNAME;
}

SpotifyUtils.isShortUrl = function (spotifyUrl) {
  return url.parse(spotifyUrl).hostname === SHORT_HOSTNAME;
}

SpotifyUtils.isSpotifyUrl = function (spotifyUrl) {
  var hostname = url.parse(spotifyUrl).hostname;
  return hostname === FULL_HOSTNAME || hostname === SHORT_HOSTNAME;
}

SpotifyUtils.getFullUrl = function (shortUrl, callback) {
  request({ url: shortUrl, followRedirect: false }, function (err, resp, body) {
    callback(err, resp.request.response.headers.location);
  });
}

module.exports = SpotifyUtils;