// src/redux/auth/reducer.js
import { SET_AUTH_DATA, CLEAR_AUTH_DATA } from "./actions";

const initialState = {
  accessToken: null,
  refreshToken: null,
  email: null,
  username: null,  
  role: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        accessToken: action.payload.accessToken ?? null,
        refreshToken: action.payload.refreshToken ?? null,
        email: action.payload.email ?? null,
        username: action.payload.username ?? null,
        role: action.payload.role ?? null
      };
    
    case CLEAR_AUTH_DATA:
      return initialState;
    
    default:
      return state;
  }
};

export default authReducer;