import React from 'react'
import './CartItemCard.css'
import {Link} from "react-router-dom"

const CartItemCard = ({item,removeItem}) => {
  return (
    <div className='cartItemCard'>
        <img src={item.image} alt="Tasveer" />
        <div>
            <Link to={`/product/${item.productId}`}>{item.name}</Link>
            <span>{`Price: Rs ${item.price}`}</span>
            <p onClick={()=>removeItem(item.productId)}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard