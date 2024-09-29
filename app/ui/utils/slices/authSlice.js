

// import { createSlice } from "@reduxjs/toolkit";

// let userInfo = null;

// if (typeof window !== 'undefined') {
//     const userInfoFromStorage = localStorage.getItem('userInfo');
//     if (userInfoFromStorage) {
//         try {
//             userInfo = JSON.parse(userInfoFromStorage);
//         } catch (error) {
//             console.error("Failed to parse userInfo from localStorage:", error);
//             // Handle the error or clear the invalid localStorage entry
//             localStorage.removeItem('userInfo');
//         }
//     }
// }

// const initialState = {
//     userInfo: userInfo
// };
//   const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//       setCredentials: (state, action) => {
//         state.userInfo = action.payload;
//         localStorage.setItem('userInfo', JSON.stringify(action.payload));
//       },
//       logout: (state, action) => {
//         state.userInfo = null;
//         localStorage.removeItem('userInfo');
//       },
//     },
//   });

// export const {setCredentials, logout} = authSlice.actions

// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Initial state for userInfo, handling localStorage
const initialState = {
  userInfo: typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
