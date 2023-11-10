import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './AuthenticationSlice';


const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;