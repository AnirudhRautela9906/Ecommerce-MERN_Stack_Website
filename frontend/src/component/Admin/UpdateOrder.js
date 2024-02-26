import React, { Fragment,useEffect,useState } from "react";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { Link,useParams } from "react-router-dom";
import Sidebar from "./Sidebar"
import Loader from "../layout/Loader/Loader"
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, updateOrder } from "../../actions/orderAction";
import NotFound from "../../component/layout/NotFound.js"
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Button } from '@mui/material';
import './UpdateProduct.css'
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";





const UpdateOrder = () => {
  const { order,loading,error } = useSelector((state) => state.orderDetails);
  const { isUpdated,Error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  
  const [status, setStatus] = useState("")

  const updateOrderSubmitHandler = (e) =>{
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("status",status)
    dispatch(updateOrder(id,myForm))

  }

  useEffect(() => {
    
    if(error || Error){
      setErrorOpen(true)
      setTitle(error || Error)
     
    }
    
    if(isUpdated){
      setSuccessOpen(true)
      setTitle("Order Status Updated Successfully")
     
          dispatch({type:UPDATE_ORDER_RESET})
  }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, Error, isUpdated]);
  
  if(error){
    return    <NotFound text={"Order Not Found"}/>
  }



  return (
    <Fragment>
    <MetaData title={`ADMIN - UPDATE ORDER STATUS`} />
    {loading ? <Loader/> :
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
        <div className="confirmOrderPage"
         style={{display: order.orderStatus === "Delivered" ? "block" : 'grid'}}
        >
        <div>
          <div className="confirmShippingArea">
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
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
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
        <div
        style={{display: order.orderStatus === "Delivered" ? "none" : 'block'}}
        >
          
        <form  className="updateOrderForm"  onSubmit={updateOrderSubmitHandler}>
            <h1> Process Order</h1>
              
                <div>
                <AccountTreeIcon/>
                <select  onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Status</option>
                    {order.orderStatus === "Processing" && (
                    <option value="Shipped">Shipped</option>
                    )}
                    {order.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                    )}
                   
                </select>
                </div>
               
                <Button
                 id='createProductBtn'
                 type="submit"
                 disabled={loading ?  true : false || status === "" ? true : false}
                >
                Update Status
                </Button>
               
            </form>
        </div>
      </div>
        </div>
    </div>
      }
      <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
      <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
   </Fragment>
      
   
  );
};


export default UpdateOrder