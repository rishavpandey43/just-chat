import * as actionTypes from "./actionTypes";

import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  };
};

export const loginSuccess = response => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    message: response.message
  };
};

export const loginFailure = response => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    message: response.message
  };
};

export const loginFetch = credentials => dispatch => {
  dispatch(loginRequest());

  axios
    .post(baseUrl + "user/login", JSON.stringify(credentials), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    .then(response => {
      dispatch(loginSuccess(response.data));
      // localStorage.setItem("auth_practice_token", response.data.token);
    })
    .catch(err => {
      err.response
        ? dispatch(
            loginFailure({
              message: `${err.response.data}, please enter correct detail to continue`
            })
          )
        : dispatch(
            loginFailure({
              message:
                "Network Error, Connection to server couldn't be established. Please try again."
            })
          );
    });
};

export const logoutRequest = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST
  };
};

export const logoutSuccess = response => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const logoutFailure = response => {
  return {
    type: actionTypes.LOGOUT_FAILURE
  };
};

export const logoutFetch = credentials => dispatch => {
  dispatch(logoutRequest());

  axios
    .get(baseUrl + "user/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    .then(response => {
      console.log(response);
      dispatch(logoutSuccess(response.data));
      // localStorage.setItem("auth_practice_token", response.data.token);
    })
    .catch(err => {
      err.response
        ? dispatch(
            logoutFailure({
              message: `${err.response.data}`
            })
          )
        : dispatch(
            logoutFailure({
              message:
                "Network Error, Connection to server couldn't be established. Please try again."
            })
          );
    });
};
