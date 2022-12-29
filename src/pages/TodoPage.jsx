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
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput />
      <TodoCollection todos={dummyTodos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
