/**
* File Manager Reducer
*/

import initialState from './initialState';

import {
  USER_SIGNED_IN,
  USER_LOGGED_OUT,
  USER_SIGNED_UP,
  USER_UPDATE,
  USER_UPDATE_EMAIL,
  USER_UPDATE_COMPANY_NAME,
  USER_UPDATE_NAME,
  USER_TOGGLE_AGENCY,
  USER_SET_PASSWORD,
} from '../types/AuthTypes';

const AuthReducer = (state = initialState.Auth, action) => {
  switch (action.type) {
    case USER_SIGNED_UP:
      return {
        ...state,
        User: {
          ...state.User,
          ...action.payload.user
        }
      }
    case USER_UPDATE:
      return {
        ...state,
        User: {
          ...state.User,
        }
      }
    case USER_UPDATE_EMAIL:
      return {
        ...state,
        User: {
          ...state.User,
          email: action.payload.email
        }
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        User: state.User,
      }
    case USER_UPDATE_COMPANY_NAME:
      return {
        ...state,
        User: {
          ...state.User,
          companyName: action.payload.companyName
        }
      }
    case USER_UPDATE_NAME:
      return {
        ...state,
        User: {
          ...state.User,
          displayName: action.payload.displayName
        }
      }
    case USER_SET_PASSWORD:
      return {
        ...state,
        User: {
          ...state.User,
          password: action.payload.password
        }
      }
    case USER_TOGGLE_AGENCY:
      return {
        ...state,
        User: {
          ...state.User,
          isAgency: action.payload.isAgency
        }
      }
    default:
      return state;
  }
};

export default AuthReducer;


