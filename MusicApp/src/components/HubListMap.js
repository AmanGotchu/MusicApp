import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapOverlay from './MapOverlay';


class HubListMap extends Component {

state = {
  hubName: 'Hub Placeholder',
  numUsers: 10,
  currSong: 'Placeholder',
  markers: [
    {
      key: 1,
      hubName: 'Aman House',
      numUsers: 6,
      currSong: 'Pokemon Master',
      latlng: {
            latitude: 37.8,
            longitude: -122.43244,
      }
    },
    {
      key: 2,
      hubName: 'Andy House',
      numUsers: 7,
      currSong: 'Gang Starr',
      latlng: {
            latitude: 37.788,
            longitude: -122.456,
      }
    },
    {
      key: 3,
      hubName: 'Trap House',
      numUsers: 100,
      currSong: 'Trap Queen',
      latlng: {
            latitude: 37.787,
            longitude: -122.4324,
      }
    }
  ]

}

componentWillMount() {

}

onMarkerClick = ({ hubName, numUsers, currSong }) => {
  this.setState({ hubName, numUsers, currSong });
}

render() {
  return (

<View>
    <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
    >


    {this.state.markers.map(marker => (
    <Marker
      key={marker.key}
      coordinate={marker.latlng}
      onPress={() => this.onMarkerClick(marker)}
    />
  ))}


    <MapOverlay hubName={this.state.hubName} currSong={this.state.currSong} numUsers={this.state.numUsers} />
    </MapView>
</View>
  );
}

}

const styles = {
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
},
view: {
  position: 'absolute',
  width: 100,
  height: 100,
  bottom: 10,
  right: 10,
  backgroundColor: 'blue'
}
};

export default HubListMap;
