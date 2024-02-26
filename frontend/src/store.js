import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { allUsersReducer, forgotPasswordReducer, userDetailsReducer, userReducer } from "./reducers/userReducer.js"
import { subscriptionReducer } from "./reducers/subscriptionReducer.js"
import { deleteReviewsReducer, newProductReducer, newReviewReducer, productDeleteReducer, productDetailsReducer, productReducer, productReviewsReducer } from "./reducers/productReducer.js"
import { cartReducer } from "./reducers/cartReducer.js"
import { categoriesReducer } from "./reducers/categoriesReducer.js"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer.js"
import { paymentReducer } from "./reducers/paymentReducer.js"

const reducer =combineReducers({
   
    user: userReducer,
    subscription: subscriptionReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,

    products: productReducer,
    productDelete:productDeleteReducer,
    productDetails: productDetailsReducer,
    productReviews:productReviewsReducer,
    deleteReviews:deleteReviewsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,

    cart: cartReducer,
    payment: paymentReducer,

    categories:categoriesReducer,

    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    order:orderReducer,
    allOrders:allOrdersReducer,


    
})

let initialState = {
    cart:{
        
        shippingInfo: localStorage.getItem("shippingInfo") ? 
        JSON.parse(localStorage.getItem("shippingInfo"))
        : [] 
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;