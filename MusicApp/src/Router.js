import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SpotifyLogin from './components/SpotifyLogin';
import HubDashboard from './components/HubDashboard';
import Registration from './components/Registration';
import HubListMap from './components/HubListMap';
import UserInfo from './components/UserInfo';
import CreateHub from './components/CreateHub';
import CurrentHub from './components/CurrentHub';
import ManageHub from './components/ManageHub';

const RouterComponent = () => {
  return (

    <Router>

    <Scene key="root" hideNavBar>
      <Scene key="appAuth" initial>
        <Scene key="appLogin" component={LoginForm} title="App Login" hideNavBar />
        <Scene key="Register" component={Registration} title="Registration" hideNavBar />
      </Scene>

      <Scene key="Logged_In" initial>
        <Scene key="Map" component={HubListMap} title="Map" hideNavBar initial />
        <Scene key="UserInfo" component={UserInfo} title="UserInformation" hideNavBar />
        <Scene key="CreateHub" component={CreateHub} title="HubCreation" hideNavBar />
        <Scene key="CurrentHub" component={CurrentHub} title="ThisHub" hideNavBar />
        <Scene key="ManageHub" component={ManageHub} title="HubManagement" hideNavBar />
      </Scene>

      <Scene key="Spotify" title="Spotify Login" hideNavBar>
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
