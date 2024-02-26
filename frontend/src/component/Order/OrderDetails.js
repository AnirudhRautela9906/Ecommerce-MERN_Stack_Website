import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import NotFound from "../../component/layout/NotFound.js"


const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    
    if(!error)
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);
  
  if(error){
    return    <NotFound text={"Order Not Found"}/>
  }

  return (
    <Fragment>
      <MetaData title="ECOMMERCE - Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>

              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country},`}
                  </span>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                  <span>Rs {order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.productId}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                      <span>
                        {item.quantity} x Rs{item.price} =
                        <b>Rs{item.price * item.quantity} </b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs {order.itemPrice}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs {order.shippingPrice}</span>
              </div>
              <div>
                <p>GST(18%):</p>
                <span>Rs {order.taxPrice}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
                <p>
                    <b>Total:</b>
                </p>
                <span>Rs {order.totalPrice}</span>
            </div>
          </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
