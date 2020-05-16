// * Import required modules/dependencies
import axios from "axios";

// * Import all store related stuffs
import * as actionTypes from "../types/actionTypes";
import { getUserDetailFetch, removeUserDetail } from "./UserAction";

// * Import utilites
import displayFlash from "../../../utils/flashEvent";
import { baseUrl } from "../../../utils/constant";

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};

export const loginSuccess = (response) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    message: response.message,
    token: response.token,
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
    .post(baseUrl + "/user/login", JSON.stringify(formData.credentials), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      if (formData.rememberMe) {
        localStorage.setItem("chat_auth_token", response.data.token);
        localStorage.setItem("chat_auth_userId", response.data.userId);
      } else {
        sessionStorage.setItem("chat_auth_token", response.data.token);
        sessionStorage.setItem("chat_auth_userId", response.data.userId);
      }
      dispatch(loginSuccess(response.data));
      dispatch(getUserDetailFetch());
      displayFlash.emit("get-message", {
        message: response.data.message,
        type: "success",
      });
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response) {
        dispatch(
          loginFailure({
            message: `${
              error.response.statusText || error.response.data
            }, please enter correct detail to continue`,
          })
        );
        displayFlash.emit("get-message", {
          message: `${
            error.response.statusText || error.response.data.message
          }, please enter correct detail to continue`,
          type: "danger",
        });
      } else {
        dispatch(
          loginFailure({
            message:
              "Network Error, Connection to server couldn't be established. Please try again.",
          })
        );
        displayFlash.emit("get-message", {
          message: `Network Error, Connection to server couldn't be established. Please try again.`,
          type: "danger",
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
  axios
    .get(baseUrl + "/user/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          sessionStorage.getItem("chat_auth_token") ||
          localStorage.getItem("chat_auth_token")
        }`,
      },
      withCredentials: true,
    })
    .then((response) => {
      localStorage.removeItem("chat_auth_token");
      localStorage.removeItem("chat_auth_userId");
      sessionStorage.removeItem("chat_auth_token");
      sessionStorage.removeItem("chat_auth_userId");
      if (
        !localStorage.getItem("chat_auth_token") &&
        !sessionStorage.getItem("chat_auth_token")
      ) {
        dispatch(logoutSuccess(response.data));
        displayFlash.emit("get-message", {
          message: response.data.message,
          type: "success",
        });
        dispatch(removeUserDetail());
      } else {
        dispatch(
          logoutFailure({
            message: `Error logging out, please try again.`,
          })
        );
        displayFlash.emit("get-message", {
          message: `Error logging out, please try again.`,
          type: "danger",
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        dispatch(
          loginFailure({
            message: error.response.statusText || error.response.data.message,
          })
        );
        displayFlash.emit("get-message", {
          message: error.response.statusText || error.response.data.message,
          type: "danger",
        });
      } else {
        dispatch(
          loginFailure({
            message:
              "Network Error, Connection to server couldn't be established. Please try again.",
          })
        );
        displayFlash.emit("get-message", {
          message: `Network Error, Connection to server couldn't be established. Please try again.`,
          type: "danger",
        });
      }
    });
};
