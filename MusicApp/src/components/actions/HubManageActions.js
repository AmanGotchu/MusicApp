import {
    SET_HUB_ID,
    SET_CURRENT_SONG,
    DELETE_HUB,
    SET_PLAYBACK_DEVICE,
    SET_AVAILABLE_DEVICES,
    EDIT_PLAY_STATE
} from './types';

export const setHubId = (id) => {
    return {
        type: SET_HUB_ID,
        payload: id
    };
};

export const setCurrentSong = (songInfo) => {
    return {
        type: SET_CURRENT_SONG,
        payload: songInfo
    };
};

export const showDeleteHub = (status) => {
    return {
        type: DELETE_HUB,
        payload: status
    };
};

export const setPlaybackDevice = (device) => {
    return {
        type: SET_PLAYBACK_DEVICE,
        payload: device
    };
};

export const setAvailableDevices = (devices) => {
    return {
        type: SET_AVAILABLE_DEVICES,
        payload: devices
    };
};

export const editPlayState = state => {
    return {
        type: EDIT_PLAY_STATE,
        payload: state
    };
};
