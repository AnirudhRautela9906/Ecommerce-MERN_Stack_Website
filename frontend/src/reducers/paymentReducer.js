import { PAYMENT_FAIL, PAYMENT_URL_FAIL, PAYMENT_URL_REQUEST, PAYMENT_URL_SUCCESS } from "../constants/paymentConstants";

export const paymentReducer = (state = { payment: {} }, action) => {
    switch (action.type) {
      case PAYMENT_URL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case PAYMENT_URL_SUCCESS:
        return {
          loading: false,
          url: action.payload,
  
        };
      case PAYMENT_URL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case PAYMENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };