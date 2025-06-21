import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/features/authSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      dispatch(setCredentials(userId));
    }
    setLoaded(true); // чтобы не отрендерить детей до завершения
  }, [dispatch]);

  if (!loaded) return null; // или лоадер
  return children;
};

export default AuthProvider;