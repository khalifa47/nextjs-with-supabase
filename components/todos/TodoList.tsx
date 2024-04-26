import { Progress } from "../ui/progress";
import TodoItem from "./TodoItem";

const KeyGuide = () => (
  <p className="flex gap-2 text-sm">
    <span className="text-red-400">• Critical</span>
    <span className="text-orange-400">• Important</span>
    <span className="text-yellow-400">• Neutral</span>
    <span className="text-green-400">• Low</span>
    <span className="text-blue-400">• Zero</span>
  </p>
);

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const completedCount = todos.reduce(
    (acc, val) => (val.done_at ? acc + 1 : acc),
    0
  );
  const percentage = (completedCount / todos.length) * 100;
  return (
    <div className="container w-full m-2">
      {todos.length > 0 ? (
        <>
          <div className="flex items-center gap-5">
            <h1 className="text-3xl text-primary font-semibold">
              {percentage}%
            </h1>
            <p className="font-light text-sm"> Task completion</p>
          </div>

          <Progress value={percentage} className="w-[60%] h-3" />

          <KeyGuide />

          <div className="my-4 space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todoItem={todo} />
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-xl text-center font-semibold">
          Nothing to do? Add a task and get{" "}
          <span className="text-primary font-bold text-2xl">crackin!</span>
        </h1>
      )}
    </div>
  );
};

export default TodoList;
