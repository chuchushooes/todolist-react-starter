import axios from 'axios';
const baseUrl = 'http://localhost:3001';

// 之後這裡的方法都會應用到TodoPage裡
// 預計會使用到的CRUD
// 專案統一使用 async/await 方法，所以都要使用 async function
// 接收到資料後才能繼續動作(放在await之後)
// 接收後端報錯訊息 catch error
export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data; //接收到的資料會是存放在data裡
  } catch (err) {
    console.error('[get todos failed]:', err);
  }
};

// 變數 payload 通常用來表示「打包後的資訊」，在這裡打包了想要新增的 todo 內容
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axios.post(`${baseUrl}/todos`, { title, isDone }); // 把資料加入到裡面
    return res.data;
  } catch (err) {
    console.error('[Create todos failed]:', err);
  }
};

export const patchTodo = async (payload) => {
  const { title, isDone, id } = payload;
  try {
    // try catch 是怕接收會有問題才使用的報錯方式
    // patch修改 router 後要放 id
    const res = await axios.patch(`${baseUrl}/todos/${id}`, { title, isDone }); // 把資料更新到裡面
    console.log(JSON.stringify({ res })); // 這裡可以查看回傳去TodoPage的資料是什麼
    return res.data;
  } catch (err) {
    console.error('[Patch todos failed]:', err);
  }
};

// delete 從 postman 可以看出需要的只有id，接收到 id 資訊就可刪除資料了
export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (err) {
    console.error('[Delete todos failed]:', err);
  }
};
