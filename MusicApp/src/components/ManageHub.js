import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
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
const background = require('../Images/media-player.jpg');

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
            .catch(() => this.props.setUserCount(0)); //no users
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
        }).then(deviceResp => deviceResp.json().then(devices => {
            console.log(devices.devices);
            this.props.setAvailableDevices(devices.devices);
        }))));
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
        if (this.props.userCount !== 0) {
            return (
                <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .6)' }}>
                    <View style={styles.availDeviceOverlay}>
                        <Text style={styles.connectTextStyle}> Connect to a device </Text>
                        <List style={styles.deviceContainerStyle}>
                        {
                            this.props.availableDevices.map((item, i) => (
                                <View style={{ flexDirection: 'row', alignContent: 'center', paddingTop: 20 }} key={i}>
                                    <Icon
                                        name={item.type === 'Smartphone' ? 'mobile-phone' : 'computer'}
                                        containerStyle={{ paddingLeft: 20, paddingRight: 20, backgroundColor: Color2 }}
                                        onPress={() => this.chooseDevice(i)}
                                        type={item.type === 'Smartphone' ? 'font-awesome' : 'MaterialIcons'}
                                        color={item.name === this.getPlaybackName() ? Color3 : Color1}
                                        underlayColor='rgba(0, 0, 0, .0)'
                                        size={25}
                                    />
                                    <ListItem
                                        hideChevron
                                        title={item.name}
                                        onPress={() => this.chooseDevice(i)}
                                        underlayColor='rgba(0, 0, 0, .0)'
                                        titleStyle={item.name === this.getPlaybackName() ? { color: Color3 } : { color: Color1 }}
                                        containerStyle={styles.deviceStyle}
                                    />
                                </View>
                            ))
                        }
                        </List>
                    </View>
                </View>
            );
        }

        return;
    }

    renderBack() {
        return (
            <Icon
                containerStyle={{ paddingTop: 17 }}
                name='ios-arrow-back'
                onPress={() => Actions.Map()}
                type='ionicon'
                color='white'
                underlayColor='rgba(0, 0, 0, .0)'
            />
        );
    }

    renderPlay() {
        return (
            <Icon 
                name='play-circle-outline'
                type='MaterialIcons'
                onPress={() => this.playSong()}
                color={Color1}
                underlayColor='rgba(0, 0, 0, .0)'
                size={75}
            />
        );
    }

    renderPause() {
        return (
            <Icon 
                name='pause-circle-outline'
                type='MaterialIcons'
                onPress={() => this.pauseSong()}
                color={Color1}
                underlayColor='rgba(0, 0, 0, .0)'
                size={75}
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
                Actions.Map();
            }}
            onPressNo={() => {
                this.clearOverlay();
            }}
        >
            Are you sure you want to stop hosting this hub?
        </DeleteOverlay>);

        return (
            <ImageBackground source={background} style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={styles.headerStyling}>
                    <Icon
                        containerStyle={{ padding: 10, paddingLeft: 15, alignSelf: 'flex-start' }}
                        name='ios-arrow-back'
                        onPress={() => Actions.Map()}
                        type='ionicon'
                        color='white'
                        underlayColor='rgba(0, 0, 0, .0)'
                    />
                    <Icon
                        containerStyle={{ padding: 10, paddingRight: 15, alignSelf: 'flex-end' }}
                        name='x'
                        onPress={() => this.props.showDeleteHub(true)}
                        type='feather'
                        color='white'
                        underlayColor='rgba(0, 0, 0, .0)'
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.userCountContainerStyle}>
                        <Text style={styles.userCountStyle}> {this.props.userCount} Users </Text>
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
                            containerStyle={{ padding: 10, paddingRight: 20 }}
                            onPress={() => this.getPreviousSong()}
                            type='entypo'
                            color={Color1}
                            underlayColor='rgba(0, 0, 0, .0)'
                            size={35}
                        />
                        {this.props.playState ? this.renderPause() : this.renderPlay()}
                        <Icon
                                name='controller-next'
                                containerStyle={{ padding: 10, paddingLeft: 20 }}
                                onPress={() => this.getNextSong()}
                                type='entypo'
                                color={Color1}
                                underlayColor='rgba(0, 0, 0, .0)'
                                size={35}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.availDevicesButtonStyle}
                        onPress={() => this.setPlayback()}
                    >
                        <Icon
                            name='devices'
                            containerStyle={{ paddingRight: 5 }}
                            type='MaterialIcons'
                            color={Color1}
                            underlayColor='rgba(0, 0, 0, .0)'
                            size={15}
                        />
                        <Text style={styles.avalDevicesTextStyle}> Available Devices </Text>
                    </TouchableOpacity>
                </View>
                {this.props.showDelHub ? showDeleteOverlay : null}
                {this.props.availableDevices ? this.chooseAvailableDevices() : null }
                {this.props.userCount === 0 ? this.noUsers() : null}
            </ImageBackground>
        );
    }
}

const styles = {

    artistNameStyle: {
        alignSelf: 'center',
        fontWeight: '800',
        fontSize: 15,
        color: Color1,
        paddingBottom: 5,
        paddingTop: 15
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
        bottom: 20,
        flexDirection: 'row',
    },
    navigationContainerStyle: {
        paddingTop: 20,
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
        paddingBottom: 30
    },
    noUserContainerStyle: {
        position: 'absolute',
        top: 50,
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, .9)',
        justifyContent: 'center'
    },
    noUserTextStyle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: '900',
        color: Color1
    },
    deviceContainerStyle: {
        flex: 1,
        backgroundColor: Color2,
        borderColor: Color2
    },
    deviceStyle: {
        backgroundColor: Color2,
        flex: 1,
        borderColor: 'rgba(0, 0, 0, .0)'
    },
    availDeviceOverlay: {
        position: 'absolute',
        top: 50,
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: Color2,
        borderRadius: 10
    },
    connectTextStyle: {
        color: Color1,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 30
    },
    headerStyling: {
        backgroundColor: 'rgba(0, 0, 0, .0)',
        flexDirection: 'row',
        height: 60,
        paddingTop: 15,
        position: 'relative',
        justifyContent: 'space-between',
        borderRadius: 3
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
