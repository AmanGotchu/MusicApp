import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Icon, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class UserInfo extends Component {
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
                    centerComponent={{ text: 'Account Information', style: { color: '#fff', fontSize: 18 } }}
                />
                <View>
                    <FormLabel>First Name</FormLabel>
                    <FormInput />
                </View>
                <View>
                    <FormLabel>Last Name</FormLabel>
                    <FormInput />
                </View>
                <View>
                    <FormLabel>Email</FormLabel>
                    <FormInput />
                </View>
            </View>
        );
    }
}

export default UserInfo;
