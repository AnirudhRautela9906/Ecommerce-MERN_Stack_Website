import axios from "axios"
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

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    
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

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    NEW_ADDRESS_REQUEST,
    NEW_ADDRESS_SUCCESS,
    NEW_ADDRESS_FAIL,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAIL,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAIL,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,

  } from "../constants/userConstants";


//   Login
  export const login = (email,password)=> async (dispatch) =>{

    try {
        dispatch({ type:LOGIN_REQUEST })

 const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.post(`/api/v1/login`,{email,password},config)
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        })
    }

  }

// Register
  export const register = (userData)=> async (dispatch) =>{

    try {
        dispatch({ type:REGISTER_USER_REQUEST })

 const config = {headers: {"Content-Type": "multipart/form-data"}}

        const {data} = await axios.post(`/api/v1/register`,userData,config)
        
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
           
        })
    }

  }

//    Load User

export const loadUser = ()=> async (dispatch) =>{

    try {
        dispatch({ type:LOAD_USER_REQUEST })


        const {data} = await axios.get(`/api/v1/me`)
        
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })

    }
}

//    All Users -- Admin

export const getAllUsers = ()=> async (dispatch) =>{

    try {
        dispatch({ type:ALL_USER_REQUEST })

        const {data} = await axios.get(`/api/v1/admin/users`)
        
        dispatch({
            type:ALL_USER_SUCCESS,
            payload:data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

//    Get User Details -- Admin

export const getUserDetails = (id)=> async (dispatch) =>{

    try {
        dispatch({ type:USER_DETAILS_REQUEST })

        const {data} = await axios.get(`/api/v1/admin/user/${id}`)
        
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}


  // Update User --- Admin
  export const updateUser = (id,userData)=> async (dispatch) =>{

    try {
        dispatch({ type:UPDATE_USER_REQUEST })

 const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.put(`/api/v1/admin/user/${id}`,userData,config)
        
        dispatch({
            type:UPDATE_USER_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
           
        })
    }

  }

  // Delete User --- Admin
  export const deleteUser = (id)=> async (dispatch) =>{

    try {
        dispatch({ type:DELETE_USER_REQUEST })


        const {data} = await axios.delete(`/api/v1/admin/user/${id}`)
        
        dispatch({
            type:DELETE_USER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
           
        })
    }

  }

  

//    Logout User

export const logout = ()=> async (dispatch) =>{

    try {


        const {data} =   await axios.post(`/api/v1/logout`)
        
        dispatch({
            type:LOGOUT_SUCCESS,payload:data.success
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
           
        })
    }

  }

  // Update Profile
  export const updateProfile = (userData)=> async (dispatch) =>{

    try {
        dispatch({ type:UPDATE_PROFILE_REQUEST })

 const config = {headers: {"Content-Type": "multipart/form-data"}}

        const {data} = await axios.put(`/api/v1/me/update`,userData,config)
        
        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
           
        })
    }

  }


  // Update Password
  export const updatePassword = (password)=> async (dispatch) =>{

    try {
        dispatch({ type:UPDATE_PASSWORD_REQUEST })

 const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.put(`/api/v1/password/update`,password,config)
        
        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
           
        })
    }

  }

  

//   Forgot Password
export const forgotPassword = (email)=> async (dispatch) =>{

    try {
        dispatch({ type:FORGOT_PASSWORD_REQUEST })

 const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.post(`/api/v1/password/forgot`,{email},config)
        
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }

  }


  //   Reset Password
export const resetPassword = (token,password)=> async (dispatch) =>{

    try {
        dispatch({ type:RESET_PASSWORD_REQUEST })

 const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.put(`/api/v1/password/reset/${token}`,password,config)
        
        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }

  }

//   Address
export const addAddress = (address)=> async (dispatch) =>{
    try {
        dispatch({ type:NEW_ADDRESS_REQUEST })
        const config ={
          headers:  {"Content-type": "application/json"}
        } 
        const {data} = await axios.post(`/api/v1/address`,address,config)
        dispatch({
            type:NEW_ADDRESS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: NEW_ADDRESS_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }


//  Update Address
export const updateAddress = (id,address)=> async (dispatch) =>{
    try {
        dispatch({ type:UPDATE_ADDRESS_REQUEST })
        const config ={
          headers:  {"Content-type": "application/json"}
        } 
        const {data} = await axios.put(`/api/v1/existAddress/${id}`,address,config)
        dispatch({
            type:UPDATE_ADDRESS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ADDRESS_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }

//  Delete Address
export const deleteAddress = (id)=> async (dispatch) =>{
    try {
        dispatch({ type:DELETE_ADDRESS_REQUEST })
        
        const {data} = await axios.delete(`/api/v1/existAddress/${id}`)
        dispatch({
            type:DELETE_ADDRESS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: DELETE_ADDRESS_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }

//  Order
export const order = (item)=> async (dispatch) =>{
    try {
        dispatch({ type:ORDER_REQUEST })
        const config ={
            headers:  {"Content-type": "application/json"}
          } 
        const {data} = await axios.put(`/api/v1/order`,item,config)
        dispatch({
            type:ORDER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ORDER_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }

 