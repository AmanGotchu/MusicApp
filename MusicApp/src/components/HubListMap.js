import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapOverlay from './MapOverlay';
import { overlayNameChange, overlaySongChange, overlayNumUsersChange } from './actions';

class HubListMap extends Component {

state = {
  viewRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
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

onMarkerClick(marker) {
  this.props.overlayNameChange(marker.hubName);
  this.props.overlayNumUsersChange(marker.numUsers);
  this.props.overlaySongChange(marker.currSong);

  this.setState({ viewRegion: { latitudeDelta: 0.0922, longitudeDelta: 0.0421, latitude: marker.latlng.latitude, longitude: marker.latlng.longitude } });
  this.map.animateToRegion({ latitude: marker.latlng.latitude, longitude: marker.latlng.longitude }, 100);
 }

render() {
  return (

<View>
    <MapView
        ref={(el) => (this.map = el)}
        initialRegion={this.state.viewRegion}
        style={styles.map}
    >


    {this.state.markers.map(marker => (
    <Marker
      key={marker.key}
      coordinate={marker.latlng}
      onPress={() => this.onMarkerClick(marker)}
    />
  ))}


    <MapOverlay hubName={this.props.hubName} currSong={this.props.currSong} numUsers={this.props.numUsers} />
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


const mapStateToProps = state => {
  return {
    hubName: state.map.hubName,
    currSong: state.map.currSong,
    numUsers: state.map.numUsers
  };
};

export default connect(mapStateToProps, {
  overlaySongChange,
  overlayNameChange,
  overlayNumUsersChange
})(HubListMap);
