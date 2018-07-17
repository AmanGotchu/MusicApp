import {
    SET_HUB_ID,
    SET_CURRENT_SONG,
    DELETE_HUB,
    SET_PLAYBACK_DEVICE,
    SET_AVAILABLE_DEVICES,
    EDIT_PLAY_STATE
} from '../actions/types';

const INITIAL_STATE = {
    hubId: '',
    showDeleteHub: false,
    currentSongInfo: undefined,
    playbackDevice: undefined,
    availableDevices: undefined,
    playState: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EDIT_PLAY_STATE:
            return { ...state, playState: action.payload };
        case SET_AVAILABLE_DEVICES:
            return { ...state, availableDevices: action.payload };
        case SET_PLAYBACK_DEVICE:
            return { ...state, playbackDevice: action.payload };
        case DELETE_HUB:
            return { ...state, showDeleteHub: action.payload };
        case SET_HUB_ID:
            return { ...state, hubId: action.payload };
        case SET_CURRENT_SONG:
            return { ...state, currentSongInfo: action.payload };
        default:
            return state;
    }
};
