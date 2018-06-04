import React from 'react';
import { View , Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection } from './common';

const SpotifyLogin = () => {

  hubMove = () => {
    Actions.Hub();
  };

  return (
    <View style={{ flex: 1 }}>
      <Card style={{ paddingTop: 80 }}>
        <CardSection>
          <Button onPress={this.hubMove}>
            Spotify Login
          </Button>
        </CardSection>
      </Card>
    </View>


  );

}

export default SpotifyLogin;
