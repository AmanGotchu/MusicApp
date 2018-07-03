import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    PASSWORD_CHANGED2,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    REGISTER_USER_SUCCESS,
    PASSWORD_NON_MATCH
    } from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const passwordChanged2 = (text) => {
    return {
        type: PASSWORD_CHANGED2,
        payload: text
    };
};

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFailed(dispatch));
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.Spotify();
};

const loginUserFailed = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAILED });
};

const registerUserSuccess = (dispatch) => {
    dispatch({ type: REGISTER_USER_SUCCESS });
};

export const passwordNonMatch = () => {
    return { type: PASSWORD_NON_MATCH };
};

export const registerUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => registerUserSuccess(dispatch, user))
            .catch(() => loginUserFailed(dispatch));
    };
};
