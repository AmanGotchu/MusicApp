import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';

class MapOverlay extends Component {

  render() {
   return (
     <View style={styles.container}>
        <Text style={styles.text}> {this.props.hubName} </Text>
        <Text style={styles.text}> {this.props.currSong} </Text>
        <Text style={styles.text}> {this.props.numUsers} </Text>
     </View>
   );
  }
}

const styles = {
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 3,
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {

  }
};

export default MapOverlay;
