import React, { Component } from 'react';
import { Text, Linking, View } from 'react-native';
import querystring from 'querystring';

const S_CLIENT_ID = '5a7e235500fe40509dee5c659b63f316';
const REDIRECT_URI = 'soundhub://callback';
const extension = querystring.stringify({
  client_id: S_CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  scope: 'user-read-private user-read-email'
});
const url = `https://accounts.spotify.com/authorize/?${extension}`;

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
      let code = event.url.split('code=').pop();
      if (code.includes('#_=_')) {
        code = code.split('#_=_')[0];
      }
      console.log('Code is: ', code);
      fetch('http://127.0.0.1:5000/auth/token', { //the server hosted with flask
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          code
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
