import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SpotifyLogin from './components/SpotifyLogin';
import HubDashboard from './components/HubDashboard';
import Registration from './components/Registration';
import HubListMap from './components/HubListMap';
import Home from './components/Home';
import UserInfo from './components/UserInfo';
import ManageHub from './components/ManageHub';
import CurrentHub from './components/CurrentHub';

const RouterComponent = () => {
  return (

    <Router>
    <Scene key="root" hideNavBar>

      {/* <Scene key="HubList">
        <Scene key="Map" component={HubListMap} title="Map" hideNavBar />
      </Scene> */}

      <Scene key="appAuth">
        <Scene key="appLogin" component={LoginForm} title="App Login" hideNavBar initial />
      </Scene>

      <Scene key="Register" component={Registration} title="Registration" />

      <Scene key="Logged_In">
        <Scene key="Home" component={Home} title="HomePage" hideNavBar />
        <Scene key="UserInfo" component={UserInfo} title="UserInformation" hideNavBar />
        <Scene key="ManageHub" component={ManageHub} title="HubCreation" hideNavBar initial />
        <Scene key="CurrentHub" component={CurrentHub} title="thisHub" hideNavBar />
      </Scene>

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
