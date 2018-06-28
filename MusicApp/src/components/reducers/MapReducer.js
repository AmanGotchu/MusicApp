import {

  MAP_OVERLAY_NAME_CHANGE,
  MAP_OVERLAY_SONG_CHANGE,
  MAP_OVERLAY_NUMUSERS_CHANGE

} from '../actions/types';


const INITIAL_STATE = {

  hubName: '',
  currSong: '',
  numUsers: Number

};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAP_OVERLAY_NAME_CHANGE:
      return { ...state, hubName: action.payload };
    case MAP_OVERLAY_SONG_CHANGE:
      return { ...state, currSong: action.payload };
    case MAP_OVERLAY_NUMUSERS_CHANGE:
      return { ...state, numUsers: action.payload };
    default:
      return { state };
  }
};
