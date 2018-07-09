import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class CreateHub extends Component {
    state = { hubId: '' }
    onCreateHubButtonPress() {
        //const id = firebase.auth().currentUser.uid;
        //take data from input fields and send off to createHub
        fetch('http://127.0.0.1:5000/hubs/addHub', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(Jresponse => this.setState({ hubId: Jresponse }));
    }

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
            <View style={{ backgroundColor: 'red', flex: 1, justifyContent: 'center' }}>
                <Header
                    leftComponent={this.renderBack()}
                    backgroundColor='blue'
                />
                <View style={{ backgroundColor: 'green' }}>
                    <Text>{this.state.hubId}</Text>
                </View>
                <View style={styles.buttonAlignment}>
                    <TouchableOpacity
                        style={styles.createHubButton}
                        onPress={() => this.onCreateHubButtonPress()}
                    >
                    <Text style={styles.createHubText}>
                        Create Hub
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    buttonAlignment: {
        backgroundColor: 'grey',
        flex: 1,
    },
    createHubButton: {
        backgroundColor: '#C0C0C0',
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50
    },
    createHubText: {
        margin: 30,
        alignSelf: 'center',
        color: 'white'
    }
};

export default CreateHub;

