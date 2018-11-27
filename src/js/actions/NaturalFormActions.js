/**
* Natural Form Actions
*/

/* ----------  Types  ---------- */
import {
  FORM_FETCHED,
  SET_ACTIVE_FIELD,
} from '../types/NaturalFormTypes';

/* ----------  Actions  ---------- */
export const formFetched = form => ({
  type: FORM_FETCHED,
  payload: {
    form,
  }
});

export const setActiveField = activeFieldId => ({
  type: SET_ACTIVE_FIELD,
  payload: {
    activeFieldId
  }
});

