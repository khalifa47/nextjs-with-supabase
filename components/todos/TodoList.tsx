const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="container">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
