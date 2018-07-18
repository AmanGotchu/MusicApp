import {
    SET_HUB_ID,
    SET_CURRENT_SONG,
    DELETE_HUB,
    SET_PLAYBACK_DEVICE,
    SET_AVAILABLE_DEVICES,
    SET_TIME_SPACING,
    EDIT_PLAY_STATE,
    EDIT_SONG_PROGRESS
} from '../actions/types';

const INITIAL_STATE = {
    hubId: '',
    showDeleteHub: false,
    currentSongInfo: undefined,
    playbackDevice: undefined,
    availableDevices: undefined,
    playState: '',
    songProgress: 0,
    timeSpacing: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TIME_SPACING:
            return { ...state, timeSpacing: action.payload };
        case EDIT_SONG_PROGRESS:
            return { ...state, songProgress: action.payload };
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
