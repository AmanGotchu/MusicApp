import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
    } from '../actions/types';

const INITIAL_STATE = { 
    email: '', 
    password: '',
    error: '',
    loading: false,
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_START:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...INITIAL_STATE, user: action.payload, error: '' };
        case LOGIN_USER_FAILED:
            return { ...INITIAL_STATE, error: 'Invalid Login' };
        default:
            return state;
    }
};
