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
      apiKey: 'AIzaSyAxMSAW4GuJL3AqNIsPUP6ydOp_FGzN3Vo',
      authDomain: 'manager-76cfe.firebaseapp.com',
      databaseURL: 'https://manager-76cfe.firebaseio.com',
      projectId: 'manager-76cfe',
      storageBucket: 'manager-76cfe.appspot.com',
      messagingSenderId: '241971962677'
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
