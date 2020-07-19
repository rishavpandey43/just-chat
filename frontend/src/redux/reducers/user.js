import * as actionTypes from '../actions/types/actionTypes';

const initialState = {
  isFetching: false,
  isUpdating: false,
  errMessage: null,
  user: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DETAIL_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.user,
        successMessage: action.message,
        errMessage: null,
      };
    case actionTypes.GET_USER_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        errMessage: action.message,
      };
    case actionTypes.REMOVE_USER_DETAIL:
      return {
        ...state,
        isFetching: false,
        user: null,
      };
    case actionTypes.UPDATE_USER_DETAIL_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case actionTypes.UPDATE_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        user: action.newUser,
        successMessage: action.message,
      };
    case actionTypes.UPDATE_USER_DETAIL_FAILURE:
      return {
        ...state,
        isUpdating: false,
        errMessage: action.message,
      };
    default:
      return state;
  }
};

export default user;
