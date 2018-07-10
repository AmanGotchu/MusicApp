import {
    SET_HUB_ID
} from '../actions/types';

const INITIAL_STATE = {
    hubId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_HUB_ID:
            console.log('BOO', action.payload);
            return { ...state, hubId: action.payload };
        default:
            return state;
    }
};
