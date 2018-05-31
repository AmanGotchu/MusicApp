import React from 'react';
import { Text } from 'react-native';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SpotifyLogin from './components/SpotifyLogin';
import HubDashboard from './components/HubDashboard';



const RouterComponent = () => {
  return(

    <Router>
    <Scene key="root" hideNavBar>

      <Scene key="appAuth">
        <Scene key="appLogin" component={LoginForm} title="App Login"/>
      </Scene>

      <Scene key="Spotify" title="Spotify Login">
        <Scene key="SpotifyLogin" component={SpotifyLogin}/>
      </Scene>

      <Scene key="Hub" title="Hubs" initial>
        <Scene key="HubDashboard" component={HubDashboard}/>

      </Scene>




    </Scene>

    </Router>
  );
};


export default RouterComponent;
