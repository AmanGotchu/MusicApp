import React, { Component } from 'react';
import { Text, Linking, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Bubbles } from 'react-native-loader';
import querystring from 'querystring';
import firebase from 'firebase';
import { 
  Color1,
  Color2,
  Color3,
  Color4,
  Color5
} from './common/Colors';

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

  configToken(snapshot) {
    if (snapshot.val().RefreshToken === undefined) {
      Linking.openURL(url).catch(err => console.error('an error as occured', err));
      Linking.addEventListener('url', this.handleOpenURL.bind(this));
    } else {
      Actions.Logged_In();
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
      });
    }
  }

  render() {
    return (
      <View style={styles.backgroundStyle}>
        <View style={styles.bubbleStyle}>
          <Bubbles
            size={30}
            color={Color4}
          />
        </View>
          <Text style={styles.textStyle}>
            Connecting With Spotify
          </Text>
      </View>
    );
  }
}

const styles = {
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Color3,
  },
  bubbleStyle: {
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '900',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50
  }
};

export default SpotifyLogin;
