import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserSettings from './UserInfoReducer';
import MapReducer from './MapReducer';
import HubManageReducer from './HubManageReducer';

export default combineReducers({
    auth: AuthReducer,
    userInfo: UserSettings,
    map: MapReducer,
    hubManage: HubManageReducer
});
