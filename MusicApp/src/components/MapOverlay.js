import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class MapOverlay extends Component {

  render() {
   return (
     <View style={styles.container}>
        <Text> TestName </Text>
        <Text> TestSong </Text>
        <Text> TestNum </Text>
     </View>

     
   );
  }
}

const styles = {
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 200,
    width: 200,
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default MapOverlay;
