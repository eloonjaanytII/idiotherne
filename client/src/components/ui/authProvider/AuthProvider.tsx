import { useEffect, useState } from 'react';
import { setCredentials } from '../../store/features/authSlice';
import { useAppDispatch} from '../../store/hooks'

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      dispatch(setCredentials(Number(userId)));
    }
    setLoaded(true); // чтобы не отрендерить детей до завершения
  }, [dispatch]);

  if (!loaded) return null;
  return children;
};

export default AuthProvider;