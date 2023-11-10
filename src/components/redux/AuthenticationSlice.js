import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  authToken: '',
  response: {},
  user_id: '',
};

const LOGIN_URL = 'http://127.0.0.1:4000/login';
const LOGOUT_URL = 'http://127.0.0.1:4000/logout';
const SIGNUP_URL = 'http://127.0.0.1:4000/signup';

export const signUp = createAsyncThunk('user/signup', async (newUser) => {
  const response = await axios.post(`${SIGNUP_URL}`, newUser);
  console.log('Sign up response:', response);
  sessionStorage.setItem('authToken', response.headers.authorization);
  sessionStorage.setItem('isAuthenticated', 'true');
  return response.data;
});

export const logIn = createAsyncThunk('user/login', async (newSession) => {
  const response = await axios.post(`${LOGIN_URL}`, newSession);
  console.log('Login response:', response);
  sessionStorage.setItem('authToken', response.headers.authorization);
  sessionStorage.setItem('isAuthenticated', 'true');
  return response.data.status;
});

export const logOut = createAsyncThunk('user/logout', async () => {
  const authToken = sessionStorage.getItem('authToken');

  const response = await axios.delete(LOGOUT_URL, {
    headers: {
      Authorization: authToken,
    },
  });
  console.log('Logout response:', response);
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('isAuthenticated');
});

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => ({
        ...state,
        isAuthenticated: true,
        authToken: action.payload,
        response: action.payload,
      }))
      .addCase(logIn.fulfilled, (state, action) => ({
        ...state,
        isAuthenticated: true,
        authToken: action.payload,
        response: action.payload,
      }))
      .addCase(logOut.fulfilled, (state) => ({
        ...state,
        isAuthenticated: false,
        authToken: '',
      }));
  },
});

export const { setIsAuthenticated } = authenticationSlice.actions;
export default authenticationSlice.reducer;