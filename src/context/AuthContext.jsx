import { useState } from 'react';
import { createContext } from 'react';

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

//建立 provider 來管理 context 內的狀態操作

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false) //預設是否認證
  const [payload, setPayload] = useState(null) // 預設使用者資料為null

  //這裡Provider的value會定義defaultAuthContext內的值是什麼
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload,
      }}
    ></AuthContext.Provider>
  );
}