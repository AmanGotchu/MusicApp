import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import React, { Component } from 'react';
import Router from './Router';
import reducers from './components/reducers';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBVt5xV-rwdWfYU4pICMNIEgdB0GN434Vg',
      authDomain: 'musicapp-a40f1.firebaseapp.com',
      databaseURL: 'https://musicapp-a40f1.firebaseio.com',
      projectId: 'musicapp-a40f1',
      storageBucket: 'musicapp-a40f1.appspot.com',
      messagingSenderId: '868653032624'
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}
export default App;
