import axios from "axios"
import { PAYMENT_FAIL, PAYMENT_URL_FAIL, PAYMENT_URL_REQUEST, PAYMENT_URL_SUCCESS } from "../constants/paymentConstants"
 
//    Get Payment Url

export const getPaymentUrl = ()=> async (dispatch) =>{
    
    try {
        dispatch({ type:PAYMENT_URL_REQUEST })
        
        const {data} = await axios.get(`/api/v1/get_url`)
        
        dispatch({
            type:PAYMENT_URL_SUCCESS,
            payload:data.url
        })
    } catch (error) {
        dispatch({
            type: PAYMENT_URL_FAIL,
            payload: error.response.data.message,
        })
        
    }
}

export const startPayment = (user,url)=> async (dispatch) =>{
    try {
        
        const {data:{key}}= await axios.get(`/api/v1/get_key`)

        const {data} = await axios.post(`/api/v1/payment_order`,{plan_price:user.order.totalPrice})
    
        const options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: user.name,
            description: "Transaction",
            image: user.avatar.url,
            order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${url}/api/v1/payment_verification`,
            prefill: {
                name: user.name,
                email: user.email,
                contact: user?.phone
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#121212"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    } catch (error) {
        dispatch({
            type: PAYMENT_FAIL,
            payload: error.response.data.message,
        })
    }
}