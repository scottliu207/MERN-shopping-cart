import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
} from "../constants/productConstants"

// Get all products reducer
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Get product detail reducer
export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_DETAILS_RESET:
      return {
        product: {},
      }
    default:
      return state
  }
}

// Create product review reducer
export const productReivewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

// Admin create new product reducer
export const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      }
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_CREATE_RESET:
      return {
        product: {},
      }
    default:
      return state
  }
}

// Admin delete product reducer
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

// Admin update product reducer
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
