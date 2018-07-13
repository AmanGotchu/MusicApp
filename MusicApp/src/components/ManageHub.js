import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import querystring from 'querystring';
import { setCurrentSong, setTrackAttributes } from './actions';

class ManageHub extends Component {
    componentWillMount() {
        const userId = firebase.auth().currentUser.uid;
        fetch('http://127.0.0.1:5000/hubs/getRecentlyPlayed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId, 
                hubId: this.props.hubId 
            })
        }).then(response => response.json().then(
            songInfo => this.props.setCurrentSong(songInfo)))
        .catch(() => {
            fetch('http://127.0.0.1:5000/hubs/getNextSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: querystring.stringify({
                    userId, 
                    hubId: this.props.hubId 
                })
            }).then(response => response.json().then(
                songInfo => this.props.setCurrentSong(songInfo)))
            .catch((err) => console.log(err));
        });
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

    renderCenterComponent() {
        if (this.props.currSongInfo) {
            console.log(this.props.currSongInfo.album);
            return (
                <Image
                    source={{ url: this.props.currSongInfo.album.images[0].url }}
                    style={{ height: 300, width: 300 }}
                />
            );
        }

        return (
            <Text> Filler </Text>
        );
    }

    render() {
        console.log(this.renderCenterComponent(), 'render');
        return (
            <View style={{ flex: 1, backgroundColor: 'grey' }}>
                <Header
                    leftComponent={this.renderBack()}
                    backgroundColor='blue'
                />
                <Text> Hello </Text>
                <View style={{ backgroundColor: 'black', flex: 1 }} >
                    {this.renderCenterComponent()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        hubId: state.hubManage.hubId,
        currSongInfo: state.hubManage.currentSongInfo
    };
};

export default connect(mapStateToProps, {
    setCurrentSong,
    setTrackAttributes })(ManageHub);
