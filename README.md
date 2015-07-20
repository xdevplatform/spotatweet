spotatweet
==========

A real-time Spotify &amp; Twtter API mashup.

This web app filters the Twitter stream for #NowPlaying tweets, extracts track IDs from Spotify URLs, requests track data from the Spotify API and plays the audio in the web browser. Implements Twitter status/filter stream and oEmbed API.

Inspired by [Serendipity](https://www.spotify.com/us/arts/serendipity/) by [@kcimc](https://twitter.com/kcimc), a Spotify Media Artist in Residence.

![Screenshot](screenshot.png?raw=true =858x "Screenshot")

Installing and Running
----

Install [Node.js](https://nodejs.org/).

Clone GitHub repo:

```
git clone https://github.com/twitterdev/spotatweet.git
```

Create Twitter and Spotify Apps:

- Create a [Twitter application](https://apps.twitter.com).
- Create a [Spotify application](https://developer.spotify.com/my-applications).

Create a config.json file using config.sample.json as a template. Fill in your Twitter & Spotify App API Keys.

Install [Compass](http://compass-style.org/) Ruby Gem.

```
gem install compass
```

If you do not want Compass support, comment out this line in app.js

```
// app.use(require('node-compass')({mode: 'compress'}));
```

Install node module dependencies:

```
npm install 
```

Run application:

```
npm start
```

Go to [http://localhost:3000](http://localhost:3000) in your browser.

A GET request to /nowplaying.json will return a Tweet object hydrated with a "spotify_track" object and a "oembed" object of the latest #NowPlaying Tweet.

Deploying
---
This application is already configured to run on Heroku and can be [deployed with Git](https://devcenter.heroku.com/articles/git).

Before deployment set your Heroku environment [config vars](https://devcenter.heroku.com/articles/config-vars) to mirror config.json.

On Heroku set NODE_ENV to "production."


Resources
----
- [Twitter API statuses/filter stream](https://dev.twitter.com/docs/api/1.1/post/statuses/filter)
- [Twitter API oEmbed](https://dev.twitter.com/docs/api/1/get/statuses/oembed)
- [Twitter REST API Rate Limiting](https://dev.twitter.com/docs/rate-limiting/1.1)
- [Spotify Web API](https://developer.spotify.com/web-api/)
