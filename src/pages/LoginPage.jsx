import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleClick = async () => {
    //先驗證使用者輸入是否有值
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    // 調用 login() 並傳入表單資料，解構取出success/authToken(在auth 的 login api 有 return 的二個值)
    const { success, authToken } = await login({
      username,
      password,
    });

    // 如果登錄成功了話，習慣上我們會把 token 存在 localStorage 內，就可以在 react 的每個頁面取用到
    // 取用到的話就可以去確認他是以認證的狀態
    if (success) {
      localStorage.setItem('authToken', authToken);
      // 引用的套件，顯示成功並 return
      Swal.fire({
        title: '登錄成功',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
      navigate('/todo')
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
