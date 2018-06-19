import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SpotifyLogin from './components/SpotifyLogin';
import HubDashboard from './components/HubDashboard';
import Registration from './components/Registration';

const RouterComponent = () => {
  return (

    <Router>
    <Scene key="root" hideNavBar>

      <Scene key="appAuth" initial>
        <Scene key="appLogin" component={LoginForm} title="App Login" hideNavBar initial />
      </Scene>

      <Scene key="Register" component={Registration} title="Registration" />

      <Scene key="Spotify" title="Spotify Login">
        <Scene key="SpotifyLogin" component={SpotifyLogin} />
      </Scene>

      <Scene key="Hub" title="Hubs">
        <Scene key="HubDashboard" component={HubDashboard} />
      </Scene>

    </Scene>

    </Router>
  );
};


export default RouterComponent;
