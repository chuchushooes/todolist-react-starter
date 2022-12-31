import { useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

// 這是TodoPage，Todo的入口，這裡傳一個假資料給TodoCollection
const TodoPage = () => {
  const [todos, setTodos] = useState(dummyTodos);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (value) => {
    console.log('input', value);
    setInputValue(value);
  };

  const handleAddTodo = () => {
    // 簡單的錯誤判斷，當input內沒有值就return不讓他更新
    if (inputValue.length === 0) {
      return;
    }
    // 這裡要使用function的方式嗎? 先去拿之前資料再進行修改
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          title: inputValue,
          isDone: false,
          id: Math.random() * 100,
        },
      ];
    });

    setInputValue(''); //todo加入後清空input內value值
  };

  // 和 handleTodo 原理一樣直接複製貼上
  const handleKeyDown = () => {
    if (inputValue.length === 0) {
      return;
    }
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          title: inputValue,
          isDone: false,
          id: Math.random() * 100,
        },
      ];
    });
    setInputValue('');
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
      <Footer />
    </div>
  );
};

export default TodoPage;
