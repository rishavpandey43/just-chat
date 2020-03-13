import * as ActionTypes from "./actionTypes";

export const signupRequest = credentials => {
  return {
    TYPE: ActionTypes.SIGNUP_REQUEST,
    credentials
  };
};

export const signupSuccess = () => {
  return {
    TYPE: ActionTypes.SIGNUP_SUCCESS
  };
};

export const signupFailure = () => {
  return {
    TYPE: ActionTypes.SIGNUP_FAILURE
  };
};

export const loginRequest = credentials => {
  return {
    TYPE: ActionTypes.LOGIN_REQUEST,
    credentials
  };
};

export const loginSuccess = response => {
  return {
    TYPE: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  };
};

export const loginFailure = response => {
  return {
    TYPE: ActionTypes.LOGIN_FAILURE,
    token: response.token
  };
};

export const logoutRequest = () => {
  return {
    TYPE: ActionTypes.LOGOUT_REQUEST
  };
};

export const logoutSuccess = () => {
  return {
    TYPE: ActionTypes.LOGOUT_SUCCESS
  };
};

export const logoutFailure = () => {
  return {
    TYPE: ActionTypes.LOGOUT_FAILURE
  };
};
