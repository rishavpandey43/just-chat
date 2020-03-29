import * as actionTypes from "../actions/actionTypes";

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
  errMessage: null
};

const authDetail = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.credentials
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: "",
        token: action.token
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.message
      };
    default:
      return state;
  }
};

export default authDetail;
