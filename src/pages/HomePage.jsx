import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 首頁頁要做身分認證判斷
const HomePage = () => {
  const isAuthenticated = useAuth(); //引入 useAuth context
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo');
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);
};

export default HomePage;
