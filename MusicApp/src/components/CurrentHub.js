import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class CurrentHub extends Component {

    renderBack() {
        return (
            <Icon   
                containerStyle={{ paddingTop: 17 }}
                name='ios-arrow-back'
                onPress={() => Actions.Home()}
                type='ionicon'
                color='white'
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={this.renderBack()}
                    backgroundColor='blue'
                />
            </View>
        );
    }
}

export default CurrentHub;
