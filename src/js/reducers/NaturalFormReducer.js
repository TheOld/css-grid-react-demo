/**
* Natural Form Reducer
*/

import initialState from '../reducers/initialState';

/* ----------  Types  ---------- */
import {
  FORM_FETCHED,
  SET_ACTIVE_FIELD,
} from '../types/NaturalFormTypes';

const NaturalFormReducer = (state = initialState.NaturalForm, action) => {
  switch (action.type) {
    case FORM_FETCHED:
      return {
        ...state,
        form: action.payload.form
      }
    case SET_ACTIVE_FIELD:
      return {
        ...state,
        activeFieldId: action.payload.activeFieldId
      }
    default:
      return state;
  }
};

export default NaturalFormReducer;
