// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  name: null,
  email: null,
  role: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.userId = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectUserId = (state) => state.auth.userId;
export const selectUserName = (state) => state.auth.name;
export const selectUserEmail = (state) => state.auth.email;
export default authSlice.reducer;
