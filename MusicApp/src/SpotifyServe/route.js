const CLIENT_ID = '5a7e235500fe40509dee5c659b63f316';
const CLIENT_SECRET = 'e551e52e22fa4caeacc4874a1c6a2fa9';
const REDIRECT_URI = 'soundhub://';

const Spotify = require('spotify-web-api-node');

const spotifyApi = new Spotify({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});

