import axios from 'axios';
const baseUrl = 'http://localhost:3001';

// 之後這裡的方法都會應用到TodoPage裡
// 預計會使用到的CRUD
// 專案統一使用 asycn/await 方法，所以都要使用 asycn function
// 接收到資料後才能繼續動作(放在await之後)
// 接收後端報錯訊息 catch error
export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data; //接收到的資料會是存放在data裡
  } catch (err) {
    console.log('[get todos failed]:', err);
  }
};

// 變數 payload 通常用來表示「打包後的資訊」，在這裡打包了想要新增的 todo 內容
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axios.post(`${baseUrl}/todos`, { title, isDone }); // 把資料加入到裡面
    return res.data;
  } catch (err) {
    console.log('[Create todos failed]:', err);
  }
};
export const patchTodo = () => {};
export const deleteTodo = () => {};
