import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    NEW_ADDRESS_REQUEST,
    NEW_ADDRESS_FAIL,
    NEW_ADDRESS_SUCCESS,
    NEW_ADDRESS_RESET,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAIL,
    UPDATE_ADDRESS_RESET,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAIL,
    DELETE_ADDRESS_RESET,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL
    
  } from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
 switch (action.type) {
    case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
       


        return{
            loading: true,
            // isAuthenticated: false
        } 
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated: true,
            user : action.payload,
        }
        case ORDER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated: true,
            user : action.payload.user,
        }
        case LOGIN_SUCCESS: 

        return{
            ...state,
            loading:false,
            isAuthenticated: true,
            user : action.payload,
            Name: action.payload.name 
        }

        case LOGOUT_SUCCESS:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                isloggedOut:action.payload
            }


        case LOGIN_FAIL: 
        case REGISTER_USER_FAIL:
        return{
            ...state,
            loading:false,
            isAuthenticated: false,
            user : null,
            error : action.payload,
        }
        case ORDER_FAIL:
        return{
            ...state,
            loading:false,
            error : action.payload,
        }
        case LOAD_USER_FAIL :
            return{
                loading:false,
            isAuthenticated: false,
            user : null,
            error : action.payload,
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }    
//      default:
//         return state


//  }

// }

// export const profileReducer = (state = {  }, action) => {
//  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case NEW_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
        case ADD_TO_CART:
            case REMOVE_CART_ITEM:
            case ORDER_REQUEST:
        
        return{
            ...state,
            // loading: true,
            error : null,
            isUpdated : null,
            isAddAddress : null,
            isDeleteAddress : null,
            isUpdateAddress : null,
            message:null
        } 
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isUpdated : action.payload,
        }
        case NEW_ADDRESS_SUCCESS:
        return{
            ...state,
            loading:false,
            isAddAddress : action.payload.success,
            user: action.payload.user
        }
        case UPDATE_ADDRESS_SUCCESS:
        return{
            ...state,
            loading:false,
            isUpdateAddress : action.payload.success,
            user: action.payload.user
        }
     
        case DELETE_ADDRESS_SUCCESS:
        return{
            ...state,
            isDeleteAddress : action.payload.success,
            user: action.payload.user
        }
     
        case DELETE_USER_SUCCESS:
        return{
            ...state,
            isDeleted : action.payload.success,
            message: action.payload.message
        }

        case UPDATE_PROFILE_FAIL: 
        case UPDATE_PASSWORD_FAIL: 
        case UPDATE_USER_FAIL: 
        case DELETE_USER_FAIL: 
     case NEW_ADDRESS_FAIL: 
     case UPDATE_ADDRESS_FAIL: 
     case DELETE_ADDRESS_FAIL:
        return{
            ...state,
            loading:false,
            error : action.payload,
        }

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return{
                ...state,
                isUpdated:null
            }
        case DELETE_USER_RESET:
            return{
                ...state,
                isDeleted:null
            }
      
        case NEW_ADDRESS_RESET:
            return{
                ...state,
                isAddAddress:null
            }
        case UPDATE_ADDRESS_RESET:
            return{
                ...state,
                isUpdateAddress:null
            }
        case DELETE_ADDRESS_RESET:
            return{
                ...state,
                isDeleteAddress:null
            }
      
     default:
        return state


 }

}


export const forgotPasswordReducer = (state = {  }, action) => {
 switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
        return{
            ...state,
            loading: true,
            error : null,

        } 
        case FORGOT_PASSWORD_SUCCESS:
        return{
            ...state,
            loading:false,
            message : action.payload,
        }

        case RESET_PASSWORD_SUCCESS:
        return{
            ...state,
            loading:false,
            success : action.payload,
        }

        case FORGOT_PASSWORD_FAIL: 
        case RESET_PASSWORD_FAIL: 
        return{
            ...state,
            loading:false,
            error : action.payload,
        }

        
      
     default:
        return state


 }

}


export const allUsersReducer = (state = { users:[] }, action) => {
 switch (action.type) {
    case ALL_USER_REQUEST:
        return{
            loading: true,
            ...state,
        } 

        case ALL_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            users : action.payload,
        }

        case ALL_USER_FAIL: 
        return{
            ...state,
            loading:false,
            Error : action.payload,
        }
     default:
        return state
 }
}

export const userDetailsReducer = (state = { user:{} }, action) => {
 switch (action.type) {
    case USER_DETAILS_REQUEST:
        return{
            ...state,
            loading: true,
            Error : null,
        } 

        case USER_DETAILS_SUCCESS:
        return{
            ...state,
            loading:false,
            user : action.payload,
        }
        case USER_DETAILS_FAIL: 
        return{
            ...state,
            loading:false,
            Error : action.payload,
        }
     default:
        return state
 }
}