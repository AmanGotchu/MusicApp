import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ModalNavigator from './ModalNavigator';

class CurrentHub extends Component {

    state = { isChildOpen: false }

    renderBack() {
        return (
            <Icon
                containerStyle={{ paddingTop: 17 }}
                name='ios-arrow-back'
                onPress={() => Actions.pop()}
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
                <ModalNavigator isOpen={this.state.isChildOpen} onSomeChildPress={() => this.setState({ isChildOpen: !this.state.isChildOpen })} />
            </View>
        );
    }
}

export default CurrentHub;
