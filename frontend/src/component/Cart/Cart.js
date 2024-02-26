import React, { Fragment } from 'react'
import "./Cart.css"
import MetaData from '../layout/MetaData'
import CartItemCard from "./CartItemCard.js"
import {useSelector, useDispatch} from "react-redux"
import {addItemsToCart, removeItemsToCart} from "../../actions/cartAction"
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const Cart = () => {

    const dispatch = useDispatch()

    const {user} = useSelector(state=> state.user)


    const increaseQuantity = (id,quantity,stock)=>{
        // convert into number first
        if(Number(stock) > Number(quantity)){
        const newQty = (Number(quantity) +1);
        // if(Number(quantity) >=  Number(stock)) return;
        dispatch(addItemsToCart(id,newQty))
    }
    if(Number(quantity) >  Number(stock)) {  dispatch(removeItemsToCart(id))}

    }
    const decreaseQuantity = (id,quantity,stock)=>{
        const newQty = Number(quantity) -1;
        if( Number(quantity) <= 1) return  ;
        dispatch(addItemsToCart(id,newQty))
        if(Number(quantity) >  Number(stock)) {  dispatch(removeItemsToCart(id))}
    }
    const removeItem = (productId)=>{
        dispatch(removeItemsToCart(productId))
    }
   
  
    
   
  return (
    <Fragment>
    <MetaData title={`ECOMMERCE - CART`}/>

        {user.cart.length === 0 ? 
        
        <div className="emptyCart flexCenterColumn">
            <RemoveShoppingCartIcon/>
            <Typography>No Product in Your Cart</Typography>
            <Link to="/">View Products</Link>
        </div>


        :

        <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {
                user.cart && user.cart.map((item)=>(
                    <div className="cartContainer" key={item.productId}>
            <CartItemCard item={item} removeItem={removeItem}/>
            <div className="cartInput">
                <button  onClick={()=>decreaseQuantity(item.productId,item.quantity,item.stock)}>-</button>
                <p>{item.quantity}</p>
                <button  onClick={()=>increaseQuantity(item.productId,item.quantity,item.stock)}>+</button>
            </div>
            <p className='cartSubtotal'>Subtotal {`Rs ${item.price * item.quantity}`}</p>
            </div>
                ))
            }
            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`Rs ${user.cart.reduce(
                        (accumulator,item)=> accumulator + item.quantity * item.price,0
                    )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <Link to='/shipping' >Check Out</Link>
                </div>
            </div>
        </div>
    </Fragment>
        }
    </Fragment>
  )
}

export default Cart