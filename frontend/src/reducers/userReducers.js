import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
  ADMIN_UPDATE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../constants/userConstants"

// User login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

// User register
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// get user detail
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      }
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_DETAILS_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

//  Update user profile
export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      }
    case UPDATE_USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Admin gets all users
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      }
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      }
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LIST_RESET:
      return {
        users: [],
      }
    default:
      return state
  }
}

// Admin update user
export const adminUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case ADMIN_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ADMIN_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ADMIN_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

// Admin delete user
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      }
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
