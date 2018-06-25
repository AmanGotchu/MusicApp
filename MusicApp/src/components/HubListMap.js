import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class HubListMap extends Component {

render() {
  return (

    <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
    />

  );
}

}

const styles = {
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
};

export default HubListMap;
