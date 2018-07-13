import {
    SET_HUB_ID,
    SET_CURRENT_SONG
} from '../actions/types';

const INITIAL_STATE = {
    hubId: '',
    currentSongInfo: undefined
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_HUB_ID:
            return { ...state, hubId: action.payload };
        case SET_CURRENT_SONG:
            return { ...state, currentSongInfo: action.payload };
        default:
            return state;
    }
};
