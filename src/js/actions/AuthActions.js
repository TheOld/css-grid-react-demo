/**
* Auth Actions
*/

import {
  USER_SIGNED_IN,
  USER_LOGGED_OUT,
  USER_SIGNED_UP,
  USER_SIGN_UP,
  USER_UPDATE,
  USER_UPDATE_EMAIL,
  USER_UPDATE_COMPANY_NAME,
  USER_UPDATE_NAME,
  USER_TOGGLE_AGENCY,
  USER_SET_PASSWORD
} from '../types/AuthTypes';

/* ----------  Actions  ---------- */

/**
* Sets a new user
*
* @param {object} user
*/
export const setUser = user => ({
  type: USER_SIGNED_UP,
  payload: {
    user,
  }
});

export const updateUser = user => ({
  type: USER_UPDATE,
  payload: {
    user,
  }
});

export const updateEmail = email => ({
  type: USER_UPDATE_EMAIL,
  payload: {
    email,
  }
});

export const updateCompanyName = name => ({
  type: USER_UPDATE_COMPANY_NAME,
  payload: {
    companyName: name
  }
});

export const updateDisplayName = name => ({
  type: USER_UPDATE_NAME,
  payload: {
    displayName: name
  }
});

export const toggleIsAgency = isAgency => ({
  type: USER_TOGGLE_AGENCY,
  payload: {
    isAgency
  }
});


export const setPassword = password => ({
  type: USER_SET_PASSWORD,
  payload: {
    password
  }
});

export const signOut = () => ({
  type: USER_LOGGED_OUT,
});

