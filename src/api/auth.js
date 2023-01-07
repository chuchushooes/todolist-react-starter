import axios from 'axios';
const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    // 這裡是把 response 內的 data 物件直接解構
    // axios 回傳為一個物件 data，其內有 authToken 和 user
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    console.log(data); // 這裡執行時可以先印出data資訊看出是否能拿到資料

    // 這裡又把 data 內的物件解構，取出authToken值
    const { authToken } = data;

    // 加入條件式，如果有成功取出就回傳 success flag 新增在 data 內
    // (在data資訊內新增 success內的key value)
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

// 後端驗證 token 是否正確
export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      //HTML規格模式記得這裡 Bearer後面要多留空白
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    //後端會回傳成功與否，所以我們要回傳 success 屬性出去
    return response.data.success;
  } catch (err) {
    console.error('[Check Permission Failed]:', err);
  }
};
