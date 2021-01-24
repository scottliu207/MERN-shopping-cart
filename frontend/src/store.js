import { createStore, combineReducers, applyMiddleware } from "redux"
import  { composeWithDevTools } from "redux-devtools-extension"
import  thunk  from "redux-thunk"
import { productDetailReducers, productListReducers } from "./reducers/productReducers"


const reducer = combineReducers({
    productList:productListReducers,
    productDetails: productDetailReducers
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store 