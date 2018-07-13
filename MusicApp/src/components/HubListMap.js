import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import querystring from 'querystring';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dimensions, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

    ],
    hubID: null
  };

componentWillMount() {
  axios.get('https://soundhubflask.herokuapp.com/hubs/getHubs/')
   .then(result =>
    this.setState({ markers: JSON.parse(result.request.response) })
   );
}

onMarkerClick(marker) {
  this.props.overlayNameChange(marker.hubName);
  this.props.overlayNumUsersChange(marker.numUsers);
  this.props.overlaySongChange(marker.currSong);

  this.setState({ viewRegion: { latitudeDelta: 0.0922, longitudeDelta: 0.0421, latitude: marker.latlng.latitude, longitude: marker.latlng.longitude }, hubID: marker.hubID });
  this.map.animateToRegion({ latitude: marker.latlng.latitude, longitude: marker.latlng.longitude }, 100);
  console.log(marker.hubID);
 }

 onButtonClick() {
   fetch('https://soundhubflask.herokuapp.com/hubs/addUser', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: querystring.stringify({
           user_id: firebase.auth().currentUser.uid,
           hub_id: this.state.hubID
       })
   });
 }

render() {
  return (

<View>


<MapView
    ref={(el) => (this.map = el)}
    initialRegion={this.state.viewRegion}
    style={styles.map}
>


{this.state.markers.map((marker, index) => (
<Marker
  key={index}
  coordinate={marker.latlng}
  onPress={() => this.onMarkerClick(marker)}
/>
))}

</MapView>

<Card
  containerStyle={styles.container}
  title="Hub Info"

>
  <Text>Name: Fortnite Friday</Text>
  <Text>Song: I play Pokemon Go!</Text>
  <Text>Users: 100</Text>
  <Button
    leftIcon={{
      name: 'login',
      type: 'simple-line-icon'
     }}
    style={{ marginTop: 20 }}
    backgroundColor='#F18F01'
    title='Join Hub'
    onPress={() => this.onButtonClick()}
  />
</Card>
</View>

  );
}

}

const styles = {
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
},
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
