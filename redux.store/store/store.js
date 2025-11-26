import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice/slice.user' ;
import messageReducer from '../slice/msgSlice/slice.message'

export const store = configureStore({
  reducer: {
    user : userReducer,
    message : messageReducer ,
    
  },
});