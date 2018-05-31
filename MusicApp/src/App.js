import React, {Component} from 'react';
import ReactNative from 'react-native';
import Router from './Router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';



class App extends Component{
  render(){
    return(

        <Router />

    );
  }
}
export default App;
