spotatweet
==========

A Spotify &amp; Twtter API mashup.

This web app filters the Twitter stream for #NowPlaying tweets, extracts track IDs from Spotify URLs, requests track data from the Spotify API and plays the audio in the web browser.

Installing and Running
----

Install [Node.js](http://nodejs.org/).

Clone GitHub repo:

```
git clone https://github.com/twitterdev/spotatweet.git
```

Create Twitter and Spotify Apps:

- Create a [Twitter application](https://apps.twitter.com).
- Create a [Spotify application](https://developer.spotify.com/my-applications).

Create a config.json file using config.sample.json as a template. Fill in your Twitter & Spotify App API Keys.

Install node module dependencies:

```
npm install 
```

Run application:

```
npm start
```

Go to [http://localhost:3000](http://localhost:3000) in your browser.



Resources
----
- [Spotify Web API](https://developer.spotify.com/web-api/)
- [Twitter API statuses/filter stream](https://dev.twitter.com/docs/api/1.1/post/statuses/filter)
- [Twitter API oEmbed](https://dev.twitter.com/docs/api/1/get/statuses/oembed)
