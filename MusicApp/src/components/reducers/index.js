import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserSettings from './UserInfoReducer';
import MapReducer from './MapReducer';

export default combineReducers({
    auth: AuthReducer,
    userInfo: UserSettings,
    map: MapReducer
});
