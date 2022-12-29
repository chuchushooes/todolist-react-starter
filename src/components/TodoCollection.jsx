import TodoItem from './TodoItem';

// 這是整個Todo集合，其下有一串TodoItem
// todos 帶入整個陣列 map TodoItem 用
const TodoCollection = ({
  todos,
  onToggleDone,
  onSave,
  onDelete,
  onChangeMode,
}) => {
  return (
    <div>
      TodoCollection
      {todos.map(todo => {
       return (<TodoItem key={todo.id} todo={todo} />);
      })}
    </div>
  );
};

export default TodoCollection;
