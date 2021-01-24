import  thunk  from "redux-thunk"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { cartReducer } from "./reducers/cartReducers"
import { 
    productDetailReducers, 
    productListReducers 
} from "./reducers/productReducers"


const reducer = combineReducers({
    productList:productListReducers,
    productDetails: productDetailReducers,
    cart:cartReducer
})

const cartItemsFromStorage = localStorage.getItem("cartItems") ?JSON.parse(localStorage.getItem("cartItems")) :[]
    
const initialState = {
    cart : { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store 