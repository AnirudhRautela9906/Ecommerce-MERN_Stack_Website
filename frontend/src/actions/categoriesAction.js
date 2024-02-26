import axios from 'axios'
import { ALL_CATEGORIES_FAIL, ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, CREATE_CATEGORIES_FAIL, CREATE_CATEGORIES_REQUEST, CREATE_CATEGORIES_SUCCESS, DELETE_CATEGORIES_FAIL, DELETE_CATEGORIES_REQUEST, DELETE_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_FAIL, UPDATE_CATEGORIES_REQUEST, UPDATE_CATEGORIES_SUCCESS } from '../constants/categoriesConstants'

// All Categories
export const getAllCategories = ()=> async (dispatch) =>{
    try {
        dispatch({ type:ALL_CATEGORIES_REQUEST })
        
        const {data} = await axios.get(`/api/v1/categories`)

        dispatch({
            type:ALL_CATEGORIES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }

  
  // Create Category
  export const createCategory = (category)=> async (dispatch) =>{
    try {
        dispatch({ type:CREATE_CATEGORIES_REQUEST })
        const config ={
          headers:  {"Content-type": "multipart/form-data"}
        } 
        const {data} = await axios.post(`/api/v1/category`,{category},config)
        dispatch({
            type:CREATE_CATEGORIES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORIES_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }
  

  // Update Product
  export const updateCategory = (id,category)=> async (dispatch) =>{
    try {
        // console.log(category)
        dispatch({ type:UPDATE_CATEGORIES_REQUEST })
        const config ={
          headers:  {"Content-type": "multipart/form-data"}
        } 
        const {data} = await axios.put(`/api/v1/category/${id}`,{category},config)
        dispatch({
            type:UPDATE_CATEGORIES_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORIES_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }
  
  // Delete Product
  export const deleteCategory = (id)=> async (dispatch) =>{
    try {
        dispatch({ type:DELETE_CATEGORIES_REQUEST })
       
        const {data} = await axios.delete(`/api/v1/category/${id}`)
        dispatch({
            type:DELETE_CATEGORIES_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORIES_FAIL,
            payload: error.response.data.message,
           
        })
    }
  }
  