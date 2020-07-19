// * Import required modules/dependencies
import axios from 'axios';

// * Import all store related stuffs
import * as actionTypes from '../types/actionTypes';
import { logoutFetch } from './AuthActions';

// * Import utilites
import { baseUrl, storageAuthTokenName } from '../../../utils/constant';

export const getUserRequest = () => {
  return {
    type: actionTypes.GET_USER_DETAIL_REQUEST,
  };
};

export const getUserSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_DETAIL_SUCCESS,
    user: data.user,
  };
};

export const getUserFailure = (data) => {
  return {
    type: actionTypes.GET_USER_DETAIL_FAILURE,
    message: data.message,
  };
};

export const getUserFetch = () => (dispatch) => {
  dispatch(getUserRequest());

  axios
    .get(baseUrl + '/user/get-user-detail', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          localStorage.getItem(storageAuthTokenName) ||
          sessionStorage.getItem(storageAuthTokenName)
        }`,
      },
    })
    .then((response) => {
      dispatch(getUserSuccess(response.data));
    })
    .catch((error) => {
      if (
        error.response &&
        (error.response.status === 401 ||
          error.response.statusText === 'Unauthorized')
      ) {
        dispatch(logoutFetch());
      } else {
        dispatch(
          getUserFailure({
            message: error.response
              ? error.response.statusText || error.response.data.message
              : 'Unable to connect to server, please try again later',
          })
        );
      }
    });
};

export const removeUser = () => {
  return {
    type: actionTypes.REMOVE_USER_DETAIL,
  };
};

// export const updateuserRequest = () => {
//   return {
//     type: actionTypes.UPDATE_USER_DETAIL_REQUEST,
//   };
// };

// export const updateuserSuccess = (response) => {
//   return {
//     type: actionTypes.UPDATE_USER_DETAIL_SUCCESS,
//     newUser: response.data.user,
//     status: response.status,
//   };
// };

// export const updateuserFailure = (response) => {
//   return {
//     type: actionTypes.UPDATE_USER_DETAIL_FAILURE,
//     message: response.message,
//     status: response.status,
//   };
// };

// export const updateuserFetch = (data) => (dispatch) => {
//   dispatch(updateuserRequest());

//   axios
//     .put(baseUrl + "/user/update-user-detail", JSON.stringify(data), {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${
//           localStorage.getItem(storageAuthTokenName) ||
//           sessionStorage.getItem(storageAuthTokenName)
//         }`,
//       },
//     })
//     .then((response) => {
//       dispatch(updateuserSuccess(response));
//       displayFlash.emit("get-message", {
//         message: response.data.message,
//         type: "success",
//       });
//     })
//     .catch((error) => {
//       console.log(error.response);
//       dispatch(
//         updateuserFailure({
//           message: error.response
//             ? error.response.statusText || error.response.data.message
//             : "Unable to connect to server, please try again later",
//           status: error.response ? error.response.status || 503 : 503,
//         })
//       );
//       displayFlash.emit("get-message", {
//         message: `${
//           error.response
//             ? error.response.data.message || error.response.data
//             : "Unable to connect to server, please try again later"
//         }`,
//         type: "danger",
//       });
//     });
// };
