import {
    FIRST_NAME_CHANGE,
    LAST_NAME_CHANGE,
    DISCARD_CHANGES
} from '../actions/types';

const INITIAL_STATE = {
    first: '',
    last: '',
    discard: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FIRST_NAME_CHANGE:
            return { ...state, first: action.payload };
        case LAST_NAME_CHANGE:
            return { ...state, last: action.payload };
        case DISCARD_CHANGES:
            console.log(action.payload);
            return { ...state, discard: action.payload };
        default:
            return state;
    }
};
