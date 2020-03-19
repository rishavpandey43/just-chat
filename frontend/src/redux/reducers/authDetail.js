import * as ActionTypes from "../actions/actionTypes";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem("chat_app_token") ? true : false,
  token: localStorage.getItem("chat_app_token"),
  user: localStorage.getItem("chat_app_credentials")
    ? JSON.parse(localStorage.getItem("chat_app_credentials"))
    : null,
  errMess: null
};

const authDetail = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.credentials
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.token
      };
    default:
      return state;
  }
};

// const authDetail = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionTypes.LOGIN_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         isAuthenticated: false,
//         user: action.credentials
//       };
//     case ActionTypes.LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isAuthenticated: true,
//         errMess: "",
//         token: action.token
//       };
//     case ActionTypes.LOGIN_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         isAuthenticated: false,
//         errMess: action.message
//       };
//     case ActionTypes.LOGOUT_REQUEST:
//       return { ...state, isLoading: true, isAuthenticated: true };
//     case ActionTypes.LOGOUT_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isAuthenticated: false,
//         token: "",
//         user: null
//       };
//     default:
//       return state;
//   }
// };

export default authDetail;
