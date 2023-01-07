import styled from 'styled-components';
import { useContext } from 'react';
import { TodosContext } from '../pages/TodoPage';

import { useAuth } from '.../context/AuthContext';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const count = useContext(TodosContext);
  // React Hooks 點擊後 localStorage 刪除 authToken 後返回登錄頁

  const { logout } = useAuth();
  const handleClick = () => {
    // 移除 localStorage 到 AuthContex logout function內
    // nav 移除直接呼叫 logout function
    logout();
    // 這裡不用 nav 的原因是因為當呼叫login時，isAuthenticated 已經變成 false，State狀態在 TodoPage 改變，useEffect 就會執行自動跳轉到 loginPage
  };
  return (
    <StyledFooter>
      <p>剩餘項目數：{count}</p>
      <StyledButton onClick={handleClick}>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
