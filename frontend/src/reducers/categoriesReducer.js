import { ALL_CATEGORIES_FAIL, ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, CREATE_CATEGORIES_FAIL, CREATE_CATEGORIES_REQUEST, CREATE_CATEGORIES_SUCCESS, DELETE_CATEGORIES_FAIL, DELETE_CATEGORIES_REQUEST, DELETE_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_FAIL, UPDATE_CATEGORIES_REQUEST, UPDATE_CATEGORIES_SUCCESS } from "../constants/categoriesConstants";

export const categoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
        case CREATE_CATEGORIES_REQUEST:
        case UPDATE_CATEGORIES_REQUEST:
        case DELETE_CATEGORIES_REQUEST:
        return {
            ...state,
            loading: true,
            error:null,
            isUpdated:null

        };
      case ALL_CATEGORIES_SUCCESS:
      case CREATE_CATEGORIES_SUCCESS:
        return {
            ...state,
            loading: false,
          categories: action.payload.categories,
         
        };
      case UPDATE_CATEGORIES_SUCCESS:
          case DELETE_CATEGORIES_SUCCESS:
        return {
            ...state,
            loading: false,
            isUpdated:action.payload
        };
     
      case ALL_CATEGORIES_FAIL:
      case CREATE_CATEGORIES_FAIL:
      case UPDATE_CATEGORIES_FAIL:
      case DELETE_CATEGORIES_FAIL:
        return {
            ...state,
            loading: false,
          error: action.payload,
        };
    
      default:
        return state;
    }
  };