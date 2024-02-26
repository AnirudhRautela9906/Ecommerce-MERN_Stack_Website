import {
  ALL_SUBSCRIPTION_FAIL,
  ALL_SUBSCRIPTION_REQUEST,
  ALL_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAIL,
  CREATE_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_RESET,
  CREATE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_FAIL,
  DELETE_SUBSCRIPTION_REQUEST,
  DELETE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAIL,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_RESET,
  UPDATE_SUBSCRIPTION_SUCCESS,
} from "../constants/subscriptionConstants";

export const subscriptionReducer = (state = { subscription: {} }, action) => {
  switch (action.type) {
    case ALL_SUBSCRIPTION_REQUEST:
    case CREATE_SUBSCRIPTION_REQUEST:
    case UPDATE_SUBSCRIPTION_REQUEST:
    case DELETE_SUBSCRIPTION_REQUEST:
      return {
        loading: true,
      };
    case ALL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: action.payload,
      };
    case CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubscriptionCreated: action.payload,
      };
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubscriptionUpdated: action.payload,
      };
    case DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubscriptionDeleted: action.payload,
      };
    case CREATE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        isSubscriptionCreated: action.payload,
      };
    case UPDATE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        isSubscriptionUpdated: action.payload,
      };
    case DELETE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        isSubscriptionDeleted: action.payload,
      };
    case CREATE_SUBSCRIPTION_RESET:
      return {
        ...state,
        loading: false,
        isSubscriptionCreated: null,
      };
    case UPDATE_SUBSCRIPTION_RESET:
      return {
        ...state,
        loading: false,
        isSubscriptionUpdated: null,
      };

    case ALL_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        subscriptions: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
