import axios from 'axios';
const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    // 這裡是把 response 內的 data 物件直接解構
    // axios 回傳為一個物件，我們直接把眾多物件內的其中一個物件 data 取出
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    console.log(data); // 這裡執行時可以先印出data資訊看出是否能拿到資料

    // 這裡又把 data 內的物件解構，取出authToken值
    const { authToken } = data;

    // 加入條件式，如果有成功取出就回傳 success flag 之後使用，以及 data資訊
    // 成功 return 到這條就結束了後面 return 不會使用
    if (authToken) {
      return { success: true, ...data };
    }

    //失敗的話還是要回傳data回去
    return data;
  } catch (err) {
    console.error('[Login Failed]:', err);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (err) {
    console.error('[Register Failed]:', err);
  }
};
