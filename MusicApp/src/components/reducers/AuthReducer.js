import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    PASSWORD_CHANGED2,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    REGISTER_USER_SUCCESS,
    PASSWORD_NON_MATCH
    } from '../actions/types';

const INITIAL_STATE = { 
    email: '', 
    password: '',
    password2: '',
    error: '',
    loading: false,
    user: null,
    registrationStatus: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD_CHANGED2:
            return { ...state, password2: action.payload };
        case PASSWORD_NON_MATCH:
            return { ...state, error: 'PASSWORDS DO NOT MATCH' };
        case LOGIN_USER_START:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAILED:
            return { ...INITIAL_STATE, error: 'INVALID EMAIL' };
        case REGISTER_USER_SUCCESS:
            return { ...INITIAL_STATE, registrationStatus: true };
        default:
            return state;
    }
};
