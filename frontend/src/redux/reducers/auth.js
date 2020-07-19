import * as actionTypes from '../actions/types/actionTypes';

import { storageAuthTokenName, storageUserIdName } from '../../utils/constant';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const initialState = {
  isAuthenticated:
    localStorage.getItem(storageAuthTokenName) ||
    sessionStorage.getItem(storageAuthTokenName)
      ? true
      : false,
  errMessage: null,
  successMessage: null,
  authToken:
    localStorage.getItem(storageAuthTokenName) ||
    sessionStorage.getItem(storageAuthTokenName) ||
    null,
  userId:
    localStorage.getItem(storageUserIdName) ||
    sessionStorage.getItem(storageUserIdName) ||
    null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        errMessage: '',
        successMessage: action.message,
        authToken: action.authToken,
        userId: action.userId,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        errMessage: action.message,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        errMessage: '',
        successMessage: action.message,
        authToken: null,
        userId: null,
        username: '',
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        errMessage: action.message,
        successMessage: '',
      };
    default:
      return state;
  }
};

export default auth;
