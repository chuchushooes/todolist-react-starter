import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { AuthProvider } from 'context/AuthContext';
/*
這裡的 AuthProvider 是一個封裝好的 component，其內包含了 Context ，而他其下的元件都能使用它所提供的 value (裡面的props)，但我們還要去執行 useContext才能使用(會import進來useAuth)
*/

const basename = process.env.REACT_APP_PUBLIC_URL;
//之前設定的.env環境檔內的變數去執行，意思是我們會在這個根路由底下去執行其他路由流程，導向HomePage

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="todo" element={<TodoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* 路由元件屬性意義
BrowserRouter => 讓其底下所有的component都能使用router
Routes => 用來定義哪個路徑配對哪個元件
path => 屬性對應網址
element => 屬性對應元件名稱
path="*" 是首頁的意思
*/
