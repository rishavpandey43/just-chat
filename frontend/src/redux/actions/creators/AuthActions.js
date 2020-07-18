// * Import required modules/dependencies
import axios from 'axios';

// * Import all store related stuffs
import * as actionTypes from '../types/actionTypes';
import { getuserFetch, removeUser } from './UserAction';

// * Import utilites
import displayFlash from '../../../utils/flashEvent';
import {
  baseUrl,
  storageAuthTokenName,
  storageUserIdName,
} from '../../../utils/constant';

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};

export const loginSuccess = (response) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    message: response.message,
    authToken: response.authToken,
    userId: response.userId,
  };
};

export const loginFailure = (response) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    message: response.message,
  };
};

export const loginFetch = (formData) => (dispatch) => {
  dispatch(loginRequest());

  axios
    .post(baseUrl + '/user/login', JSON.stringify(formData.credentials), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((response) => {
      if (formData.rememberMe) {
        localStorage.setItem(storageAuthTokenName, response.data.authToken);
        localStorage.setItem(storageUserIdName, response.data.userId);
      } else {
        sessionStorage.setItem(storageAuthTokenName, response.data.authToken);
        sessionStorage.setItem(storageUserIdName, response.data.userId);
      }
      dispatch(loginSuccess(response.data));
      dispatch(getuserFetch());
      displayFlash.emit('get-message', {
        message: response.data.message,
        type: 'success',
      });
    })
    .catch((error) => {
      if (error.response) {
        dispatch(
          loginFailure({
            message: `${
              error.response.data.errMessage || error.response.statusText
            }`,
          })
        );
        displayFlash.emit('get-message', {
          message: `${
            error.response.data.errMessage || error.response.statusText
          }`,
          type: 'danger',
        });
      } else {
        dispatch(
          loginFailure({
            message:
              "Network Error, Connection to server couldn't be established. Please try again.",
          })
        );
        displayFlash.emit('get-message', {
          message: `Network Error, Connection to server couldn't be established. Please try again.`,
          type: 'danger',
        });
      }
    });
};

export const logoutRequest = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  };
};

export const logoutSuccess = (response) => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    message: response.message,
  };
};

export const logoutFailure = (response) => {
  return {
    type: actionTypes.LOGOUT_FAILURE,
    message: response.message,
  };
};

export const logoutFetch = () => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem(storageAuthTokenName);
  localStorage.removeItem(storageUserIdName);
  sessionStorage.removeItem(storageAuthTokenName);
  sessionStorage.removeItem(storageUserIdName);
  if (
    !localStorage.getItem(storageAuthTokenName) &&
    !sessionStorage.getItem(storageAuthTokenName)
  ) {
    dispatch(logoutSuccess({ message: 'logout successfull' }));
    displayFlash.emit('get-message', {
      message: 'Logout successfull',
      type: 'success',
    });
    dispatch(removeUser());
  } else {
    dispatch(
      logoutFailure({
        message: `Error logging out, please try again.`,
      })
    );
    displayFlash.emit('get-message', {
      message: `Error logging out, please try again.`,
      type: 'danger',
    });
  }
};
