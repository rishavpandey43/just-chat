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
    message: response.message,
    token: response.token,
    userId: response.userId
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
      localStorage.setItem("chat_auth_token", response.data.token);
      localStorage.setItem("chat_auth_userId", response.data.userId);
    })
    .catch(error => {
      error.response
        ? dispatch(
            loginFailure({
              message: `${error.response.data}, please enter correct detail to continue`
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
    type: actionTypes.LOGOUT_SUCCESS,
    message: response.message
  };
};

export const logoutFailure = response => {
  return {
    type: actionTypes.LOGOUT_FAILURE,
    message: response.message
  };
};

export const logoutFetch = () => dispatch => {
  dispatch(logoutRequest());
  axios
    .get(baseUrl + "user/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("chat_auth_token")}`
      },
      withCredentials: true
    })
    .then(response => {
      localStorage.removeItem("chat_auth_token");
      if (!localStorage.getItem("chat_auth_token")) {
        dispatch(logoutSuccess(response.data));
      } else {
        dispatch(
          logoutFailure({
            message: `Error logging out, please try again.`
          })
        );
      }
    })
    .catch(error => {
      error.response
        ? dispatch(logoutFailure(error.response.data))
        : dispatch(
            logoutFailure({
              message:
                "Network Error, Connection to server couldn't be established. Please try again."
            })
          );
    });
};

// action for getting username

// export const saveLoggedUserId = response => {
//   console.log(response);
//   return {
//     type: actionTypes.SAVE_LOGGED_USER_ID,
//     userId: response.userId
//   };
// };
