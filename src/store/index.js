// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/chart';  
import localReducer from './reducers/local';     

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    local: localReducer,  
  },
});
