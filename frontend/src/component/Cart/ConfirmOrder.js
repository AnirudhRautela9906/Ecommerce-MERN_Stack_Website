import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import "./ConfirmOrder.css";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../../actions/userAction";

const ConfirmOrder = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch()
  const navigate =useNavigate()

  const subtotal = user.cart.reduce(
    (acc,item)=> acc + item.price * item.quantity,0
  ) 

  const shippingCharges = subtotal > 1000 ? 0 : 200

  const tax =  subtotal * 0.18

  const  totalPrice = subtotal + tax + shippingCharges

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`

  const proceedToPayment = () =>{
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    }
    dispatch(order(data))
    navigate("/process/payment")
  }


  return (
    <Fragment>
      <MetaData title={`ECOMMERCE - Confirm Order`} />
      <div className="confirmOrderExternal">
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {user.cart &&
                user.cart.map((item) => (
                  <div key={item.productId}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    <span>
                      {item.quantity} x Rs {item.price} =
                      <b> Rs {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs {shippingCharges}</span>
              </div>
              <div>
                <p>GST(18%):</p>
                <span>Rs {tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
                <p>
                    <b>Total:</b>
                </p>
                <span>Rs {totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
