// utils/auth.js
import { useSelector } from 'react-redux';

export const isLoggedIn = () => {
  const user = useSelector((state) => state.auth); // Adapt to your Redux state shape
  return user && user.token;
};
