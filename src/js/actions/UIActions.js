/**
* UI Actions
*/

import {
  THEME_CHANGED,
} from '../types/UITypes';

/* ----------  Actions  ---------- */
export const themeChanged = theme => ({
  type: THEME_CHANGED,
  payload: {
    theme,
  }
});
