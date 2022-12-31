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
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={(id) => {
              onToggleDone?.(id);
            }} //將TodoItem的 id 再傳上去
            onChangeMode={({ id, isEdit }) => {
              onChangeMode?.({ id, isEdit });
            }} // 將TodoItem的 id,isEdit 再傳上去
            onSave={({ id, title }) => {
              onSave?.({ id, title });
            }} // 將TodoItem的 id,title 再傳上去
            onDelete={(id) => {
              onDelete?.(id);
            }} //將TodoItem的 id 再傳上去
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
