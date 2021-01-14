import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    email: ''
  },
  reducers: {
    addAuth: (state, action) => {
        console.log(action.payload.username, action.payload.email)
        state.username = action.payload.username
        state.email = action.payload.email
    },
  },
});

export const { addAuth } = authSlice.actions;

export const selectAuth = state => state.auth.email;

export default authSlice.reducer;
