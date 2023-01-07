import styled from 'styled-components';
import { useContext } from 'react';
import { TodosContext } from '../pages/TodoPage';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const handleClick = () => {
// 移除 localStorage 到 AuthContex logout function內
    navigate('/login');
  };
  return (
    <StyledFooter>
      <p>剩餘項目數：{count}</p>
      <StyledButton onClick={handleClick}>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
