spotatweet
==========

A real-time Spotify &amp; Twitter API mashup.

This web app filters the Twitter stream for #NowPlaying tweets, extracts track IDs from Spotify URLs, requests track data from the Spotify API, displays the embedded Tweet in the web browser and plays a preview. Implements Twitter statuses/filter stream and oEmbed API.

Inspired by [Serendipity](https://twitter.com/search?q=kcimc%20serendipity) by [@kcimc](https://twitter.com/kcimc), formerly a Spotify Media Artist in Residence.

![Screenshot](screenshot.png?raw=true "Screenshot")

Installing and Running
----

Install [Node.js](https://nodejs.org/).

Clone GitHub repo:

```bash
git clone https://github.com/twitterdev/spotatweet.git
```

Create Twitter and Spotify Apps:

- Create a [Twitter application](https://developer.twitter.com/en/apps).
- Create a [Spotify application](https://developer.spotify.com/my-applications).

Create a config.json file using config.sample.json as a template. Fill in your Twitter & Spotify API Keys.

(optional) Install [Compass](http://compass-style.org/) Ruby Gem.

```bash
gem install compass
```

If you do not want Compass support, comment out this line in app.js

```javascript
// app.use(require('node-compass')({mode: 'compress'}));
```

Install node module dependencies:

```bash
npm install
```

Run application:

```bash
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

- [Twitter statuses/filter stream](https://developer.twitter.com/en/docs/tweets/filter-realtime/api-reference/post-statuses-filter.html)
- [Twitter oEmbed](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed.html)
- [Twitter Rate Limiting](https://developer.twitter.com/en/docs/basics/rate-limiting.html)
- [Spotify Web API](https://developer.spotify.com/web-api/)
