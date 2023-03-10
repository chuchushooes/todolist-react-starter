import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { register, login, checkPermission } from '../api/auth';
import * as jwt from 'jsonwebtoken'; // 這裡導入全部並命名為 jwt 做使用
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

// 初始化定義 defaultAuth 資訊
const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登錄的依據
  currentMember: null, // 使用者相關資料 預設為null
  register: null, //註冊的方法
  login: null, //登入的方法
  logout: null, //登出的方法，以上這三個在context內會定義
};

// 建立 createContext 命名為 AuthContext 讓 Page們去使用
// 帶入預設的context值 default
const AuthContext = createContext(defaultAuthContext);

//建立 useAuth 這個 Hooks，當 Pages 都執行 useAuth 時，都能引用 Context 內容
export const useAuth = () => useContext(AuthContext);

//建立 provider 來管理 context 內的狀態操作
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //預設是否認證
  const [payload, setPayload] = useState(null); // 預設使用者資料為null

  const { pathname } = useLocation(); //將當前頁面的路徑值取出(這是useLocation既有的屬性)

  //原本用nav判斷是否變動，現在改由 pathname 判斷
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        // 如果沒有authToken後續就不用作check的動作
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }

      // 如果有 token 就拿去做驗證看是否有效
      const result = await checkPermission(authToken);
      if (result) {
        // 如果驗證成功去更改state，token用jwt解析出payload，放入setPayload
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setPayload(null);
        setIsAuthenticated(false);
      }
    };
    checkTokenIsValid(); //執行上面寫好的fn
  }, [pathname]); // deps由nav改成pathname

  //這裡Provider的value會定義defaultAuthContext內的值是什麼
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && { id: payload.sub, name: payload.name }, //payload條件式，如果有值就讓再命名 id 和 name (這裡的 payload 為驗證過後的 payload)
        register: async (data) => {
          //註冊需要的內容命名他是 data
          //需要注意，在 AuthContext 不會直接知道使用者在註冊表單的輸入值，所以需要補上一個 data 當成調用函式時的參數

          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken); // 使用套件解析authToken值，但不能保證 token 是否有效 (但這裡是註冊表示如果填單寫正確應該沒有token認證問題)

          // 判斷 tempPayload 是否有被解析成功
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken); //解析成功把 token 放入 localStorage 內
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }

          return success; // 最後回傳 success 給 SingupPage 觸發 alert 視窗
        },
        // login 原理同 register
        login: async (data) => {
          // 調用 login() 並傳入表單資料，解構取出success/authToken(在auth 的 login api 有 return 的二個值)
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        // 登出不需要api ，把localStorage內的token移除就好，記得useState狀態要改變
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
