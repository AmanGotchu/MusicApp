import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Header, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import querystring from 'querystring';
import { DeleteOverlay } from './common/DeleteOverlay';
import ProgressBar from './common/ProgressBar';
import {
    Color1,
    Color2,
    Color3
} from './common/Colors';
import { setCurrentSong,
    showDeleteHub,
    setPlaybackDevice,
    setAvailableDevices,
    setTimeSpacing,
    editPlayState,
    editSongProgress,
    setUserCount } from './actions';

const defaultAlbumCover = require('../Images/defaultAlbumCover.jpg');

class ManageHub extends Component {

    state = { isChildOpen: false }

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
            .catch(() => this.props.setUserCount(0));//no users
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
        this.props.setTimeSpacing(0);
        this.props.editSongProgress(0);
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
        this.props.setTimeSpacing(0);
        this.props.editSongProgress(0);
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

    getProgress() {
        let progress = 0;
        if (this.props.currSongInfo) {
            progress = this.props.songProgress / this.props.currSongInfo.duration_ms;
        }
        return progress;
    }

    getPlaybackName() {
        if (this.props.playbackDevice) {
            return this.props.playbackDevice.name;
        }
        return undefined;
    }

    playSong() {
        let uris;
        if (this.props.songProgress <= 5000) {
            uris = JSON.stringify({ uris: [this.props.currSongInfo.uri] });
            this.props.editSongProgress(0);
        }
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getAccessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId,
            })
        }).then(response => response.json().then(AccessToken => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.props.playbackDevice.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + AccessToken
                },
                body: uris
            });
        })).then(() => this.props.editPlayState('playing'))
            .then(() => {
                this.props.setTimeSpacing(new Date().getTime());
                TimerMixin.setTimeout.call(this, () => { this.updateSongProgress(); }, 1000);
            });
    }

    updateSongProgress() {
        // new Date().getTime()
        if (this.props.playState && this.props.timeSpacing !== 0) { //if song is playing then keep updating
            this.props.editSongProgress(this.props.songProgress + (new Date().getTime() - this.props.timeSpacing));
            this.props.setTimeSpacing(new Date().getTime());
            TimerMixin.setTimeout.call(this, () => this.updateSongProgress(), 1000);
        }
        if (this.props.currSongInfo.duration_ms <= this.props.songProgress) {
            this.getNextSong();
        }
    }

    updateSongProgressSpot() {
        const userId = 'LqqarxhRAPhVF9CQcnSRtGzhSKS2';//firebase.auth().currentUser.uid;
        fetch('https://soundhubflask.herokuapp.com/hubs/getAccessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                userId,
            })
        }).then(response => response.json().then(AccessToken => {
            fetch('https://api.spotify.com/v1/me/player', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + AccessToken
                }
            }).then(response2 => response2.json().then(data => this.props.editSongProgress(data.progress_ms)));
        }));
        if (this.props.currSongInfo.duration_ms <= this.props.songProgress) {
            this.getNextSong();
        }
    }

    millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds === 60 ? (minutes + 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
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
            }))).then(() => {
                this.updateSongProgressSpot();
                this.props.editPlayState('');
            });
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

    noUsers() {
        return (
            <View style={styles.noUserContainerStyle}>
                <Text style={styles.noUserTextStyle}> No Users </Text>
            </View>
        );
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
                            titleStyle={item.name === this.getPlaybackName() ? { color: Color3 } : { color: 'black' }}
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
                color={Color1}
                underlayColor='rgba(0, 0, 0, .0)'
                size={60}
            />
        );
    }

    renderPause() {
        return (
            <Icon
                name='pause'
                type='foundation'
                onPress={() => this.pauseSong()}
                color={Color1}
                underlayColor='rgba(0, 0, 0, .0)'
                size={50}
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
                    style={{ height: 300, width: 300, alignSelf: 'center' }}
                />
            );
        }

        return (
            <Image
                source={defaultAlbumCover}
                style={{ height: 300, width: 300, alignSelf: 'center' }}
            />
        );
    }

    renderArtistName() {
        if (this.props.currSongInfo) {
            return (
                <Text
                    style={styles.artistNameStyle}
                >
                    {this.props.currSongInfo.artists[0].name}
                </Text>
            );
        }
        return (
            <Text
                style={styles.artistNameStyle}
            >
                Artist
            </Text>
        );
    }

    renderSongName() {
        if (this.props.currSongInfo) {
            return (
                <Text
                    style={styles.songNameStyle}
                >
                    {this.props.currSongInfo.name}
                </Text>
            );
        }
        return (
            <Text
                style={styles.songNameStyle}
            >
                Song
            </Text>
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
                <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center' }}>
                    <View style={styles.userCountContainerStyle}>
                        <Text style={styles.userCountStyle}> User Count: 0 </Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        {this.renderAlbumCover()}
                        {this.renderArtistName()}
                        {this.renderSongName()}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={{ color: Color1, margin: 10 }}>{this.millisToMinutesAndSeconds(this.props.songProgress)}</Text>
                            <ProgressBar
                                fillStyle={{}}
                                backgroundStyle={{ backgroundColor: '#cccccc', borderRadius: 2 }}
                                style={{ marginTop: 17, width: 250 }}
                                progress={this.getProgress()}
                            />
                            <Text style={{ color: Color1, margin: 10 }}>
                                {this.props.currSongInfo ?
                                this.millisToMinutesAndSeconds(this.props.currSongInfo.duration_ms) : '0:00'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.navigationContainerStyle}>
                        <Icon
                            name='controller-jump-to-start'
                            containerStyle={{ padding: 10 }}
                            onPress={() => this.getPreviousSong()}
                            type='entypo'
                            color={Color1}
                            underlayColor='rgba(0, 0, 0, .0)'
                            size={25}
                        />
                        {this.props.playState ? this.renderPause() : this.renderPlay()}
                        <Icon
                                name='controller-next'
                                containerStyle={{ padding: 10 }}
                                onPress={() => this.getNextSong()}
                                type='entypo'
                                color={Color1}
                                underlayColor='rgba(0, 0, 0, .0)'
                                size={25}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.availDevicesButtonStyle}
                        onPress={() => this.setPlayback()}
                    >
                        <Text style={styles.avalDevicesTextStyle}> Available Devices </Text>
                    </TouchableOpacity>
                </View>
                {this.props.showDelHub ? showDeleteOverlay : null}
                {this.props.availableDevices ? this.chooseAvailableDevices() : null }
                {this.props.userCount === 0 ? this.noUsers() : null}
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
    },
    artistNameStyle: {
        alignSelf: 'center',
        fontWeight: '800',
        fontSize: 15,
        color: Color1,
        padding: 5
    },
    songNameStyle: {
        alignSelf: 'center',
        fontSize: 12,
        color: Color1
    },
    avalDevicesTextStyle: {
        color: Color1,
        fontSize: 12
    },
    availDevicesButtonStyle: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20
    },
    navigationContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    userCountStyle: {
        color: Color1,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    userCountContainerStyle: {
        alignSelf: 'center',
        position: 'absolute',
        top: 20
    },
    noUserContainerStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, .9)',
        justifyContent: 'center'
    },
    noUserTextStyle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: '900',
        color: Color1
    }
};

const mapStateToProps = state => {
    return {
        hubId: state.hubManage.hubId,
        currSongInfo: state.hubManage.currentSongInfo,
        showDelHub: state.hubManage.showDeleteHub,
        playbackDevice: state.hubManage.playbackDevice,
        availableDevices: state.hubManage.availableDevices,
        playState: state.hubManage.playState,
        songProgress: state.hubManage.songProgress,
        timeSpacing: state.hubManage.timeSpacing,
        userCount: state.hubManage.userCount
    };
};

export default connect(mapStateToProps, {
    setCurrentSong,
    showDeleteHub,
    setPlaybackDevice,
    setAvailableDevices,
    editPlayState,
    editSongProgress,
    setTimeSpacing,
    setUserCount })(ManageHub);
