import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Header, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import querystring from 'querystring';
import { setCurrentSong, showDeleteHub, setPlaybackDevice, setAvailableDevices, editPlayState } from './actions';
import { DeleteOverlay } from './common/DeleteOverlay';

class ManageHub extends Component {
    componentWillMount() {
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getRecentlyPlayed', {
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
            fetch('https://soundhubflask.herokuapp.com/hubs/getNextSong', {
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
            .catch(() => console.log('no Users'));//no users
        });
        if (!this.props.playbackDevice) {
            this.setPlayback();
        }
    }

    setPlayback() {
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getAccessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId,
            })
        }).then(response => response.json().then(AccessToken => 
            fetch('https://api.spotify.com/v1/me/player/devices', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AccessToken
            }
        }).then(deviceResp => deviceResp.json().then(devices => 
            this.props.setAvailableDevices(devices.devices)
        ))));
    }

    getNextSong() {
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getNextSong', {
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
        )).then(() => this.playSong())
        .catch(err => console.log(err));
    }

    getPreviousSong() {
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getPreviousSong', {
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
        )).then(() => this.playSong())
        .catch(err => console.log(err));
    }

    playSong() {
        console.log(this.props.currSongInfo);
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getAccessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId,
            })
        }).then(response => response.json().then(AccessToken => 
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.props.playbackDevice.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + AccessToken
                },
                body: JSON.stringify({
                    uris: [this.props.currSongInfo.uri]
                })
            }))).then(() => this.props.editPlayState('playing'));
    }

    pauseSong() {
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getAccessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId,
            })
        }).then(response => response.json().then(AccessToken => 
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${this.props.playbackDevice.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + AccessToken
                },
            }))).then(() => this.props.editPlayState(''));
    }


    deleteHub() {
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/deleteHub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId,
                hubId: this.props.hubId
            })
        }).catch(err => console.log(err));
    }

    clearOverlay() {
        this.props.showDeleteHub(false);
    }

    chooseDevice(i) {
        this.props.setPlaybackDevice(this.props.availableDevices[i]);
        this.props.setAvailableDevices(undefined);
    }

    chooseAvailableDevices() {
        return (
            <View style={styles.availDeviceOverlay}>
                <Text> Choose PlayBack Device </Text>
                <List style={{ flex: 1 }}>
                {
                    this.props.availableDevices.map((item, i) => (
                        <ListItem
                            hideChevron
                            key={i}
                            title={item.name}
                            onPress={() => this.chooseDevice(i)}
                            underlayColor='black'
                            titleStyle={{ color: 'black' }}
                        />
                    ))
                }
                </List>
            </View>
        );
    }

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

    renderPlay() {
        return (
            <Icon 
                name='controller-play'
                type='entypo'
                onPress={() => this.playSong()}
                color='white'
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }
    
    renderPause() {
        return (
            <Icon 
                name='pause'
                type='foundation'
                onPress={() => this.pauseSong()}
                color='white'
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    renderDelete() {
        return (
            <Icon
            containerStyle={{ paddingTop: 17 }}
            name='x'
            onPress={() => this.props.showDeleteHub(true)}
            type='feather'
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
        const showDeleteOverlay = 
        (<DeleteOverlay 
            onPressYes={() => {
                this.deleteHub();
                this.clearOverlay();
                Actions.pop();
            }}
            onPressNo={() => {
                this.clearOverlay();
            }}
        > 
            Are you sure you want to stop hosting this hub?
        </DeleteOverlay>);

        return (
            <View style={{ flex: 1, backgroundColor: 'grey' }}>
                <Header
                    leftComponent={this.renderBack()}
                    rightComponent={this.renderDelete()}
                    backgroundColor='blue'
                />
                <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center' }} >
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

                        {this.renderAlbumCover()}
                        {this.renderArtistName()}
                        {this.renderSongName()}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            name='controller-jump-to-start'
                            onPress={() => this.getPreviousSong()}
                            type='entypo'
                            color='white'
                            underlayColor='rgba(0, 0, 0, .0)'
                        />
                        {this.props.playState ? this.renderPause() : this.renderPlay()}
                        <Icon
                                name='controller-next'
                                onPress={() => this.getNextSong()}
                                type='entypo'
                                color='white'
                                underlayColor='rgba(0, 0, 0, .0)'
                        />
                    </View>
                </View>
                {this.props.showDelHub ? showDeleteOverlay : null}
                {this.props.availableDevices ? this.chooseAvailableDevices() : null }
            </View>
        );
    }
}

const styles = {
    availDeviceOverlay: {
        position: 'absolute',
        top: 50,
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: '#C0C0C0'
    }
};

const mapStateToProps = state => {
    return {
        hubId: state.hubManage.hubId,
        currSongInfo: state.hubManage.currentSongInfo,
        showDelHub: state.hubManage.showDeleteHub,
        playbackDevice: state.hubManage.playbackDevice,
        availableDevices: state.hubManage.availableDevices,
        playState: state.hubManage.playState
    };
};

export default connect(mapStateToProps, {
    setCurrentSong,
    showDeleteHub,
    setPlaybackDevice,
    setAvailableDevices,
    editPlayState })(ManageHub);
