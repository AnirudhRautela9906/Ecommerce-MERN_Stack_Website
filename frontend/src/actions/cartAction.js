import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  // ORDER_SUCCESS_CART_EMPTY,
} from "../constants/cartConstants.js";
import axios from "axios";
import { LOAD_USER_SUCCESS } from "../constants/userConstants.js";

//   Cart
// export const addItemsToCart = (id,Name,Price,Image,Stock,quantity)=> async (dispatch,getState) =>{
export const addItemsToCart = (id, quantity) => async (dispatch) => {
 
 try {
  dispatch({
    type:ADD_TO_CART
  })

  const { data } = await axios.get(`/api/v1/product/${id}`);
  const saveData = {
    productId: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.stock,
    quantity,
  };

const config = {headers: {"Content-Type": "multipart/form-data"}}

const { data : {user} } = await axios.put(`/api/v1/cart/new`, saveData,config);
dispatch({
  type:LOAD_USER_SUCCESS,
  payload:user
})

 } catch (error) {
  const { data : {user} } =  await axios.put(`/api/v1/cart/clear`);
  dispatch({
    type:LOAD_USER_SUCCESS,
    payload:user
  })
 }
  

};

// Remove from Cart
export const removeItemsToCart = (productId) => async (dispatch) => {
try {
  dispatch({
    type:REMOVE_CART_ITEM
  })
  await axios.get(`/api/v1/product/${productId}`);

  const config = {headers: {"Content-Type": "multipart/form-data"}}

  const { data : {user} } = await axios.put(`/api/v1/cart/remove_item`, {productId},config);
  dispatch({
    type:LOAD_USER_SUCCESS,
    payload:user
  })
} catch (error) {
  const { data : {user} } =  await axios.put(`/api/v1/cart/clear`);
  dispatch({
    type:LOAD_USER_SUCCESS,
    payload:user
  })
}

};

//  Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  const config = {headers: {"Content-Type": "multipart/form-data"}}

  await axios.put(`/api/v1/shipping`, data,config);
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

// Order success cart empty
export const orderSuccessCartEmpty = () => async (dispatch) => {
  // dispatch({
  //   type: ORDER_SUCCESS_CART_EMPTY,
  // });
  // localStorage.setItem("cartItems", []);
};
