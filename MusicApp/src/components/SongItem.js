import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import { Card, CardSection } from './common';

const SongItem = () => {

  return(


      <CardSection style={styles.containerStyle}>

      <Image style={{
        height: '100%',
        width: '10%',
        marginLeft: '5%'
      }}
      source={require('../Images/MusicIcon.png')}
      resizeMode='contain'
      />


        <Image style={{
          height: '100%',
          width: '11%',
          borderRadius: 20,
          marginLeft: '10%'
        }}
        source={require('../Images/diamonds.jpeg')}
        />





        <View style={{flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: '10%'
        }}>
          <Text style={{fontSize: 13}}>
            Rihanna
          </Text>
          <Text style={{fontSize: 10}}>
            Diamonds
          </Text>
        </View>


        <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', paddingRight: '2.5%'}}>

          <Text style={{fontSize: 10}}>
            Played from Aman
          </Text>
          <Text style={{fontSize: 10}}>
            3.12
          </Text>
        </View>

      </CardSection>
    

  );
};


const styles = {
  containerStyle:{
    flexDirection: 'row',
    height: '11%',
    backgroundColor: '#ff6666'
  },
  textStyle:{
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default SongItem;
