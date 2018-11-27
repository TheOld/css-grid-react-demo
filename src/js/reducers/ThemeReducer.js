import initialState from "./initialState";

import {
  THEME_CHANGED,
} from '../types/UITypes';

const UI = (state = initialState.UI, action) => {
  switch (action.type) {
    case THEME_CHANGED:
      return {
        ...state,
        theme: action.payload.theme
      }
    default:
      return state;
  }
};

export default UI;
