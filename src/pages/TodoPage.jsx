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
    // 這裡要使用 callback function的方式嗎?
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
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
