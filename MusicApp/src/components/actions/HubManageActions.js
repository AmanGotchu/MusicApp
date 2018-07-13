import {
    SET_HUB_ID,
    SET_CURRENT_SONG
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
