import React from 'react';
import {View, Text} from 'react-native';
import { Button, Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';

const SpotifyLogin = () => {

  hubMove = () =>{
    Actions.Hub();
  };

  return(

    <Card>
      <CardSection>
        <Button onPress={this.hubMove}>
          Spotify Login
        </Button>
      </CardSection>
    </Card>


  );

}

export default SpotifyLogin;
