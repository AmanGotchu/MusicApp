import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import querystring from 'querystring';
import firebase from 'firebase';

class CreateHub extends Component {

    onCreateHubButtonPress() {
        console.log('pressed');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userId = firebase.auth().currentUser.uid;
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log('userId');
                fetch('https://soundhubflask.herokuapp.com/hubs/addHub', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: querystring.stringify({
                        lat,
                        lng,
                        userId
                    })
                }).then(() => { Actions.ManageHub(); });
            }
        );
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
                <View style={{ flex: 1 }} >
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
