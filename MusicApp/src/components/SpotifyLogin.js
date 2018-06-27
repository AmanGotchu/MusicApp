import React, { Component } from 'react';
import { Text, Linking, View } from 'react-native';
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
const Buffer = require('buffer/').Buffer;

class SpotifyLogin extends Component {
  state = { refreshToken: '', accessToken: '' }
  componentWillMount() {
    Linking.openURL(url).catch(err => console.error('an error as occured', err));
    Linking.addEventListener('url', this.handleOpenURL.bind(this));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL.bind(this));
  }

  setTokens(JsonData) {
    this.setState({ accessToken: JsonData.access_token, refreshToken: JsonData.refresh_token });
  }

  handleOpenURL(event) {
    if (event.url.includes('error')) {
      console.error('Denied Spotify Authentication');
      Linking.openURL(url).catch(err => console.error('an error as occured', err));
    } else {
      const code = event.url.split('=').pop();
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + (new Buffer(S_CLIENT_ID + ':' + S_CLIENT_SECRET).toString('base64'))
        },
        body: querystring.stringify({
          code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      }).then((response) => response.json())
        .then((Jresponse) => this.setTokens(Jresponse));
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignContent: 'center' }}>
        <Text> 
          Your Access Token is: {this.state.accessToken} 
        </Text >
        <Text> 
          Your Refresh Token is: {this.state.refreshToken} 
        </Text>  
      </View>
    );
  }
}

export default SpotifyLogin;
