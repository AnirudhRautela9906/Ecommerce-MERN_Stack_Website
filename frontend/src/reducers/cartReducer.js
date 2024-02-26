import { 
// ADD_TO_CART,
// REMOVE_CART_ITEM,
SAVE_SHIPPING_INFO,
// ORDER_SUCCESS_CART_EMPTY

} from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [] , shippingInfo: {}}, action) => {
  switch (action.type) {
    // case ADD_TO_CART:
    //   const item = action.payload;
    //   const isItemExist = state.cartItems.find(
    //     (i) => i.productId === item.productId
    //   );

    //   if (isItemExist) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map((i) =>
    //         i.productId === isItemExist.productId ? item : i
    //       ),
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       cartItems: [...state.cartItems, item],
    //     };
    //   }
    //   case REMOVE_CART_ITEM:
    //     return{
    //       ...state,
    //       cartItems: state.cartItems.filter((i)=> i.productId !== action.payload)
    //     }
      case SAVE_SHIPPING_INFO:
        return{
          ...state,
          shippingInfo: action.payload,
        }
      // case ORDER_SUCCESS_CART_EMPTY:
      //   return{
      //     ...state,
      //     cartItems: []
      //   }      
    default:
      return state;
  }
};
