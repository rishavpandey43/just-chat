import * as actionTypes from "../actions/actionTypes";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  errMessage: null,
  successMessage: null,
  token: null
};

const authDetail = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: "",
        successMessage: action.message
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.message
      };
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: "",
        successMessage: action.message
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.errMessage,
        successMessage: ""
      };
    default:
      return state;
  }
};

export default authDetail;
