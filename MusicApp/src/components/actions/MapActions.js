import {

  MAP_OVERLAY_NAME_CHANGE,
  MAP_OVERLAY_SONG_CHANGE,
  MAP_OVERLAY_NUMUSERS_CHANGE,
  JOIN_HUB_MAP

} from './types';


export const overlayNameChange = (text) => {
  return {
    type: MAP_OVERLAY_NAME_CHANGE,
    payload: text

};
};

export const overlaySongChange = (text) => {
  return {
    type: MAP_OVERLAY_SONG_CHANGE,
    payload: text
 };
};

export const overlayNumUsersChange = (text) => {
  return {
    type: MAP_OVERLAY_NUMUSERS_CHANGE,
    payload: text
  };
};

export const joinMapHub = (hubID) => {
  return {
    type: JOIN_HUB_MAP,
    payload: hubID
  };
};
