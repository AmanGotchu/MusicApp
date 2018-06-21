import React, { Component } from 'react';
import { Text, Linking } from 'react-native';
import querystring from 'querystring';

const S_CLIENT_ID = '5a7e235500fe40509dee5c659b63f316';
const S_CLIENT_SECRET = 'e551e52e22fa4caeacc4874a1c6a2fa9';
const REDIRECT_URI = 'soundhub://callback';
const extension = querystring.stringify({
  client_id: S_CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  scope: 'user-read-private user-read-email'
});
const url = `https://accounts.spotify.com/authorize/?${extension}`;
let code;

class SpotifyLogin extends Component {
  componentWillMount() {
    Linking.openURL(url).catch(err => console.error('an error as occured', err));
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    code = event.url.split('=').pop();
    console.log(code);
  }

  render() {
    return (<Text> Verified Page </Text>);
  }
}

export default SpotifyLogin;
