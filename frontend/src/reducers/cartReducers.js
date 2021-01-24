import {
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM
} from "../constants/cartConstants"

export const cartReducer = (state = { cartItems : [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:

        const items = action.payload
        const existItems = state.cartItems.find(cartItem => cartItem.product_id === items.product_id)
        
        if (existItems) {
            return {
                ...state,
                cartItems: state.cartItems.map( 
                    cartItem =>(
                        cartItem.product_id === existItems.product_id ?
                        items :
                        cartItem
                ))
            } 
        } else {
            return {
                ...state,
                cartItems: [...state.cartItems, items]
            }
        }
        
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item=>item.product_id !== action.payload)
            }
        default:
        return state
    }
}

