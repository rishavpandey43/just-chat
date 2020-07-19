// * Import required modules/dependencies
import { toast } from 'react-toastify';

// * Import all store related stuffs
import * as actionTypes from '../types/actionTypes';
import { removeUser } from './UserAction';

// * Import utilites
import {
  storageAuthTokenName,
  storageUserIdName,
} from '../../../utils/constant';

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
  localStorage.removeItem(storageAuthTokenName);
  localStorage.removeItem(storageUserIdName);
  sessionStorage.removeItem(storageAuthTokenName);
  sessionStorage.removeItem(storageUserIdName);
  if (
    !localStorage.getItem(storageAuthTokenName) &&
    !sessionStorage.getItem(storageAuthTokenName)
  ) {
    dispatch(logoutSuccess({ message: 'logout successfull' }));
    dispatch(removeUser());
    toast.success(`You've been logged out successfully`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    dispatch(
      logoutFailure({
        message: `Error logging out, please try again.`,
      })
    );
    toast.error(`Error logging out, please try again.`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
