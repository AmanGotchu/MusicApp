import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import querystring from 'querystring';
import ModalNavigator from './ModalNavigator';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dimensions, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { overlayNameChange, overlaySongChange, overlayNumUsersChange, joinMapHub } from './actions';
import { generatedMapStyle } from '../MapStyle/CustomMapStyle';

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
    hoverHubID: null,
    joinedHubID: null,
    isChildOpen: false
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

  this.setState({ viewRegion: { latitudeDelta: 0.0922, longitudeDelta: 0.0421, latitude: marker.latlng.latitude, longitude: marker.latlng.longitude }, hoverHubID: marker.hubID });
  this.map.animateToRegion({ latitudeDelta: 0.0922, longitudeDelta: 0.0421, latitude: marker.latlng.latitude, longitude: marker.latlng.longitude }, 100);
  console.log('You clicked on this hub ' + marker.hubID);
 }

 onButtonClick() {
   if (this.state.hoverHubID === null) {
     console.log('Select a Hub!');
   } else if (this.props.joinedHubID == null) {
     console.log('You are joining this hub ' + this.state.hoverHubID);
     fetch('https://soundhubflask.herokuapp.com/hubs/addUser', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: querystring.stringify({
             user_id: firebase.auth().currentUser.uid,
             hub_id: this.state.hoverHubID
         })
     }).then(() => this.props.joinMapHub(this.state.hoverHubID));
   } else {
     console.log("You're already in this hub: " + this.props.joinedHubID);
   }
 }

render() {
  return (

<View>


  <MapView
      provider={PROVIDER_GOOGLE}
      ref={(el) => (this.map = el)}
      initialRegion={this.state.viewRegion}
      style={styles.map}
      customMapStyle={generatedMapStyle}
  >


  {this.state.markers.map((marker, index) => (
  <Marker
    key={index}
    coordinate={marker.latlng}
    onPress={() => this.onMarkerClick(marker)}

  >
    <Callout style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000000' }}>

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

    </Callout>
  </Marker>
  ))}

  </MapView>

  <Icon
    name='chevron-with-circle-up'
    type='entypo'
    color='#517fa4'
    containerStyle={styles.iconStyles}
    onPress={() => this.setState({ isChildOpen: true })}
  />

  {console.log(this.state.isChildOpen)}
  <ModalNavigator isOpen={this.state.isChildOpen} onSomeChildPress={() => this.setState({ isChildOpen: !this.state.isChildOpen })} />

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
},
iconStyles: {
  position: 'absolute',
  left: 40,
  top: 40,
  width: 50,
  height: 50,
  backgroundColor: 'white',
  borderRadius: 25
}
};


const mapStateToProps = state => {
  return {
    hubName: state.map.hubName,
    currSong: state.map.currSong,
    numUsers: state.map.numUsers,
    joinedHubID: state.map.joinedHubID
  };
};

export default connect(mapStateToProps, {
  overlaySongChange,
  overlayNameChange,
  overlayNumUsersChange,
  joinMapHub
})(HubListMap);
