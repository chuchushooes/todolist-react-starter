import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="singup" element={<SignUpPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
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
