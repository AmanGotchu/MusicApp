import {
    FIRST_NAME_CHANGE,
    LAST_NAME_CHANGE,
    DISCARD_CHANGES
} from './types';

export const firstNameChange = (text) => {
    return {
        type: FIRST_NAME_CHANGE,
        payload: text
    };
};

export const lastNameChange = (text) => {
    return {
        type: LAST_NAME_CHANGE,
        payload: text
    };
};

export const discardChanges = (status) => {
    return {
        type: DISCARD_CHANGES,
        payload: status
    };
};
