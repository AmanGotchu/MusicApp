import {
    SET_HUB_ID
} from './types';

export const setHubId = (id) => {
    return {
        type: SET_HUB_ID,
        payload: id
    };
};
