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
import { register } from '../api/auth';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleClick = async () => {
    //先驗證使用者輸入是否有值
    if (username.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const { success, authToken } = await register({
      username,
      email,
      password,
    });

    if (success) {
      localStorage.setItem('authToken', authToken);
      // 引用的套件，顯示成功並 return
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
      navigate('/todo'); //使用React Hook直接進行頁面跳轉，不用透過Link點擊
      return;
    }
    Swal.fire({
      title: '註冊失敗',
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
      <h1>建立您的帳號</h1>

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
          label="Email"
          placeholder="請輸入 email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
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
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
