import * as actionTypes from "./actionTypes";

import axios from "axios";

export const loginRequest = credentials => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    credentials
  };
};

export const loginSuccess = response => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: response.token
  };
};

export const loginFailure = response => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    token: response.token
  };
};

export const login = credentials => dispatch => {
  dispatch(loginRequest(credentials));

  axios
    .post(
      process.env.REACT_APP_API_BASE_URL + "users/login",
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const logoutRequest = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const logoutFailure = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE
  };
};
