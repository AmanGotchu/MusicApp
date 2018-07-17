import React, { Component } from 'react';
import { Text, Linking, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import querystring from 'querystring';
import firebase from 'firebase';

const S_CLIENT_ID = '5a7e235500fe40509dee5c659b63f316';
const REDIRECT_URI = 'soundhub://callback';
const extension = querystring.stringify({
  client_id: S_CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  scope: 'user-read-private user-read-email user-read-recently-played user-top-read user-modify-playback-state user-read-playback-state'
});
const url = `https://accounts.spotify.com/authorize/?${extension}`;

class SpotifyLogin extends Component {
  state = { refreshToken: '', accessToken: '' }
  componentWillMount() {
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${id}/accountInfo/tokens`).once('value')
    .then((snapshot) => this.configToken(snapshot))
    .catch(() => {
      firebase.database().ref(`/users/${id}/accountInfo/tokens`).push('');
      firebase.database().ref(`/users/${id}/accountInfo/tokens`).once('value')
      .then((snapshot) => this.configToken(snapshot));
      });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL.bind(this));
  }

  /*setAccess(accessToken) {
    console.log(accessToken || 'whoops');
    this.setState({ accessToken });
    Actions.Logged_In();
  }*/

  configToken(snapshot) {
    if (snapshot.val().RefreshToken === undefined) {
      Linking.openURL(url).catch(err => console.error('an error as occured', err));
      Linking.addEventListener('url', this.handleOpenURL.bind(this));
    } else {
      Actions.Logged_In();
      /*fetch('http://127.0.0.1:5000/auth/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          refresh_token: snapshot.val().RefreshToken
        })
      }).then((response) => response.json())
      .then((Jresponse) => this.setAccess(Jresponse.access_token));
      */
    }
  }

  handleOpenURL(event) {
    const id = firebase.auth().currentUser.uid;

    if (event.url.includes('error')) {
      console.error('Denied Spotify Authentication');
      Linking.openURL(url).catch(err => console.error('an error as occured', err));
    } else {
      let code = event.url.split('code=').pop();
      if (code.includes('#_=_')) {
        code = code.split('#_=_')[0];
      }
      fetch('https://soundhubflask.herokuapp.com/auth/newToken', { //the server hosted with flask
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          code
        })
      }).then((response) => response.json())
      .then((Jresponse) => {
        firebase.database().ref(`/users/${id}/accountInfo/tokens`)
        .set({ RefreshToken: Jresponse.refresh_token });
        Actions.Logged_In();
        /*this.setAccess(Jresponse.access_token);*/
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignContent: 'center' }}>
        <Text>
          Your Access Token is: {this.state.accessToken}
        </Text >
      </View>
    );
  }
}

export default SpotifyLogin;
