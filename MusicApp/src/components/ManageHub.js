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
            .catch(err => console.log(err));
        });
    }

    getNextSong() {
        const userId = firebase.auth().currentUser.uid;
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
            songInfo => this.props.setCurrentSong(songInfo)
        ))
        .catch(err => console.log(err));
    }

    getPreviousSong() {
        const userId = firebase.auth().currentUser.uid;
        fetch('http://127.0.0.1:5000/hubs/getPreviousSong', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId,
                hubId: this.props.hubId
            })
        }).then(response => response.json().then(
            songInfo => this.props.setCurrentSong(songInfo)
        ))
        .catch(err => console.log(err));
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

    renderAlbumCover() {
        if (this.props.currSongInfo) {
            return (
                <Image
                    source={{ url: this.props.currSongInfo.album.images[0].url }}
                    style={{ height: 200, width: 200, alignSelf: 'center' }}
                />
            );
        }

        return (
            <Text> Filler </Text>
        );
    }

    renderArtistName() {
        if (this.props.currSongInfo) {
            console.log(this.props.currSongInfo.artists[0].name);
            return (
                <Text
                    style={{ alignSelf: 'center', color: 'white' }}
                > 
                    {this.props.currSongInfo.artists[0].name} 
                </Text>
            );
        }
        return (
            <Text> No Name Available </Text>
        );
    }

    renderSongName() {
        if (this.props.currSongInfo) {
            console.log(this.props.currSongInfo.name);
            return (
                <Text
                    style={{ alignSelf: 'center', color: 'white' }}
                > 
                    {this.props.currSongInfo.name} 
                </Text>
            );
        }
        return (
            <Text> No Name Available </Text>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'grey' }}>
                <Header
                    leftComponent={this.renderBack()}
                    backgroundColor='blue'
                />
                <Text> Hello </Text>
                <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center' }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            name='controller-jump-to-start'
                            onPress={() => this.getPreviousSong()}
                            type='entypo'
                            color='white'
                            underlayColor='rgba(0, 0, 0, .0)'
                        />
                        {this.renderAlbumCover()}
                        <Icon
                            name='controller-next'
                            onPress={() => this.getNextSong()}
                            type='entypo'
                            color='white'
                            underlayColor='rgba(0, 0, 0, .0)'
                        />
                    </View>
                    {this.renderArtistName()}
                    {this.renderSongName()}
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
