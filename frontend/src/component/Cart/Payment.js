import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Payment.css";
import { startPayment, getPaymentUrl } from "../../actions/paymentAction";
import { SuccessAlert, ErrorAlert } from "../layout/MuiAlert";
import { loadUser } from "../../actions/userAction";

// import {createOrder} from '../../actions/orderAction'
// import { orderSuccessCartEmpty } from '../../actions/cartAction'

const Payment = () => {
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { url, error } = useSelector((state) => state.payment);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  // dispatch(orderSuccessCartEmpty())

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(startPayment(user, url));
  };
  const dispatch = useDispatch();


  useEffect(() => {

    if(error){
        setErrorOpen(true)
        setTitle(error)
        setTimeout(() => {
          dispatch(loadUser())
        }, 500);
    }

    dispatch(getPaymentUrl());
    if (user.cart.length === 0) return navigate("/");
  }, [user.cart.length, navigate, dispatch,error]);

  return (
    <Fragment>
      <MetaData title={"ECOMMERCE - PAYMENT"} />
      <div className="paymentExternal">
        <CheckoutSteps activeStep={2} />
        <p className="alert">
          Max Payment limit accepted through Cards is Rs 5 Lakh. Please do not
          press any button after payment, once the payment is verified
          successfully you will be automatically redirected to the orders
          section.
        </p>
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Payment</Typography>
            <input
              type="submit"
              value={`Pay - Rs ${user.order && user.order.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
        <SuccessAlert
          open={successOpen}
          title={title}
          setOpen={setSuccessOpen}
        />
      </div>
      <SuccessAlert open={successOpen} title={title} setOpen={setSuccessOpen}/>
      <ErrorAlert open={errorOpen} title={title} setOpen={setErrorOpen} />
    </Fragment>
  );
};

export default Payment;
