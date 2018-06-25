import React, { Component } from 'react';
import { View, Text } from 'react-native';
import 'react-native-vector-icons';
import { Header, Icon } from 'react-native-elements';

class Home extends Component {
    renderCog() {
        return (
            <Icon
                containerStyle={{ paddingTop: 15 }}
                onPress={() => console.log('settings')}
                name="cog"
                type="entypo"
                color="white"
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    renderDrop() {
        return (
            <Icon 
                containerStyle={{ paddingTop: 15 }}
                onPress={() => console.log('menu')}
                name="menu"
                color="white"
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    render() {
        return (
            <View>
            <Header
                leftComponent={this.renderDrop()}
                centerComponent={{ text: 'HOME', style: { color: '#fff', fontSize: 18 } }}
                rightComponent={this.renderCog()}
            />
                <Text> Home Page </Text>
                <View>
                    <Text> Cog Icon - Settings </Text>
                    <Text> Card Icon - Payment </Text>
                    <Text> User Icon - User Settings </Text>

                </View>
            </View>
        );
    }
}

export default Home;
