import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
<<<<<<< Updated upstream
import UserSettings from './UserInfo';
import MapReducer from './MapReducer';
=======
import UserSettings from './UserInfoReducer';
>>>>>>> Stashed changes

export default combineReducers({
    auth: AuthReducer,
    userInfo: UserSettings,
    map: MapReducer
});
