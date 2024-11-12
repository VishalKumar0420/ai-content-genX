import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  token: Cookies.get('token') || null, 
  userInfo: null,  
  isAuthenticated: !!Cookies.get('token'),
  totalWordUsage:0 ,
  aiResponses: [],
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, userInfo } = action.payload;      
      state.token = token;
      state.userInfo = userInfo;
      state.isAuthenticated = true;
      Cookies.set('token', token);
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.isAuthenticated = false;
      Cookies.remove('token'); 
    },
    setTotalWordUsage:(state,action)=>{
        state.totalWordUsage=action.payload.totalWord
    },
    restoreUserData: (state, action) => {
        const { userInfo, token } = action.payload;
        state.token = token;
        state.userInfo = userInfo;
        state.isAuthenticated = true;
      },
      setAiData: (state, action) => {        
        state.aiResponses = action.payload.aiResponses;
        state.totalWordUsage = action.payload.totalWords;
      },
  },
});

// Export actions
export const { loginSuccess, logout ,setTotalWordUsage,restoreUserData,setAiData} = userSlice.actions;

// Export the user reducer
export default userSlice.reducer;
