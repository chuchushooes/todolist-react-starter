import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // 取得 login的方法和是否登入有效
  const { login, isAuthenticated } = useAuth;

  const handleClick = async () => {
    //先驗證使用者輸入是否有值
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    // 將 login api 移到 AuthContext
    // 這裡也使用 login 回傳 success 值
    const success = await login({
      username: username,
      password: password,
    });

    // 如果登錄成功了話，習慣上我們會把 token 存在 localStorage 內，就可以在 react 的每個頁面取用到
    // 取用到的話就可以去確認他是以認證的狀態
    if (success) {
      // 把 localStorage 搬到 AuthContext 內
      // 引用的套件，顯示成功並 return
      Swal.fire({
        title: '登錄成功',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
      // nav 刪除這裡不須跳轉，由別處判斷
      return;
    }
    //登錄失敗的跳出欄位
    Swal.fire({
      title: '登錄失敗',
      icon: 'error',
      showConfirmButton: false,
      position: 'top',
      timer: 1000,
    });
  };

  useEffect(() => {
    //如果已經認證就導向todo
    if (isAuthenticated) {
      navigate('/todo');
    }
  }, [navigate, isAuthenticated]); //這裡不需要做checkPermission 改成用 isAuthenticated 判斷

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
