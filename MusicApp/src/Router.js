import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SpotifyLogin from './components/SpotifyLogin';
import HubDashboard from './components/HubDashboard';
import Registration from './components/Registration';
import Home from './components/Home';
import UserInfo from './components/UserInfo';

const RouterComponent = () => {
  return (

    <Router>
    <Scene key="root" hideNavBar>

      <Scene key="appAuth">
        <Scene key="appLogin" component={LoginForm} title="App Login" hideNavBar />
      </Scene>

      <Scene key="Register" component={Registration} title="Registration" />

      <Scene key="Logged In" initial>
        <Scene key="Home" component={Home} title="HomePage" hideNavBar />
        <Scene key="UserInfo" component={UserInfo} title="UserInformation" initial hideNavBar />
      </Scene>

      <Scene key="Spotify" title="Spotify Login" >
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
