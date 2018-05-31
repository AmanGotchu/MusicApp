import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Card, CardSection } from './common';

const SongItem = () => {

  return(

    <Card style={{flexDirection: 'column', flex: 1}}>
      <CardSection style={styles.containerStyle}>

        <View style={{flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: '45%'
        }}>
          <Text style={{fontSize: 13}}>
            Rihanna
          </Text>
          <Text style={{fontSize: 10}}>
            Diamonds
          </Text>
        </View>


        <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', paddingRight: '3%'}}>

          <Text style={{fontSize: 10}}>
            Played from Aman
          </Text>
          <Text style={{fontSize: 10}}>
            3.12
          </Text>
        </View>

      </CardSection>
    </Card>

  );
};


const styles = {
  containerStyle:{
    flexDirection: 'row',
    height: '11%'
  },
  textStyle:{
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default SongItem;
