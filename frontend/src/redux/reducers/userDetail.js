import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  errMessage: null,
  user: null,
  responseStatus: null,
};

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SAVE_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.user,
        successMessage: action.message,
        responseStatus: action.status,
      };
    case actionTypes.SAVE_USER_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: null,
        errMessage: action.message,
        responseStatus: action.status,
      };
    default:
      return state;
  }
};

export default userDetail;
