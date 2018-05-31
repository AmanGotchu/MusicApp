import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SongItem from './SongItem';
class HubDashboard extends Component{
  render(){
    return(

        <View style={{flex: 1, flexDirection: 'column'}}>

          <SongItem />
          <SongItem />

        </View>


    );
  }

}

export default HubDashboard;
