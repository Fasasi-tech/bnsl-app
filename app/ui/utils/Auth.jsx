// utils/auth.js
import jwtDecode from 'jwt-decode';
import {logout} from './slices/authSlice'

export const isTokenExpired = (token) => {
  if (!token) return true;

  const { exp } = jwtDecode(token);
  const expirationTime = (exp * 1000) - 60000; // Refresh a minute early

  return Date.now() >= expirationTime;
};
