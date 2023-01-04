import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { getTodos, createTodo } from '../api/todos';

// dummyTodos因為串了後端的db後就可刪除

// 這是TodoPage，Todo的入口，這裡傳一個假資料給TodoCollection
const TodoPage = () => {
  const [todos, setTodos] = useState([]); //預設是空陣列我們抓後端db的資料從API上
  const [inputValue, setInputValue] = useState('');

  const handleChange = (value) => {
    console.log('input', value);
    setInputValue(value);
  };

  // function要改成 async/await 模式
  const handleAddTodo = async () => {
    // 簡單的錯誤判斷，當input內沒有值就return不讓他更新
    if (inputValue.length === 0) {
      return;
    }

    try {
      //使用 createTodo 取得後端資料
      // 這裡初始值就只有 title 和 isDone，id 由資料庫自行產生
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      // 這裡要使用function的方式嗎? 先去拿之前資料再進行修改
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            title: data.title,
            isDone: data.isDone,
            id: data.id,
            isEdit: false,
          },
        ];
      });
      setInputValue(''); //todo加入後清空input內value值
    } catch (err) {
      console.log(err);
    }
  };

  // 和 handleTodo 原理一樣直接複製貼上
  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            title: data.title,
            isDone: data.isDone,
            id: data.id,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (err) {
      console.log(err);
    }
  };

  //更改切換完成/未完成
  const handleToggleDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };

  //點擊二下後可編輯title , 當 Escape 時離開編輯模式
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return {
          ...todo,
          isEdit: false,
        };
      });
    });
  };

  // 按下 Enter 儲存編輯
  const handleSave = ({ id, title }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: title,
            isEdit: false,
          };
        }
        return todo;
      });
    });
  };

  // 點擊 X 後刪除該 todo
  // 不能使用splice會修改到原陣列，用filter新增全新的陣列，篩選掉不要的內容
  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos(); // 這裡使用getTodos就可以從後端拿取資料
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (err) {
        console.log(err);
      }
    };

    getTodosAsync();
  }, []); //這裡deps空白是因為只有一開始需要拿資料之後不再使用

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDeleteTodo}
      />
      <TodosContext.Provider value={todos.length}>
        {' '}
        {/* 提供目前item數目給Footer */}
        <Footer />
      </TodosContext.Provider>
    </div>
  );
};

export default TodoPage;
export const TodosContext = createContext(0); //初始值為todos長度,為空陣列0
