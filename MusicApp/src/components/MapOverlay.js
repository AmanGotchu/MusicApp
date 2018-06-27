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
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 3,
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    position: 'relative',
    justifyContent: 'flex-start',
    top: 0
  }
};

export default MapOverlay;
