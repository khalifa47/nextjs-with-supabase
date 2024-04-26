import { cn } from "@/lib/utils";
import LoadingIconButton from "../LoadingIconButton";

const TodoItem = ({ todoItem }: { todoItem: Todo }) => {
  const { id, priority, title, done_at } = todoItem;

  let priorityColor;
  switch (priority) {
    case 1:
      priorityColor = "bg-blue-400";
      break;
    case 2:
      priorityColor = "bg-green-400";
      break;
    case 3:
      priorityColor = "bg-yellow-400";
      break;
    case 4:
      priorityColor = "bg-orange-400";
      break;
    case 5:
      priorityColor = "bg-red-400";
      break;

    default:
      break;
  }

  return (
    <div
      className={cn(
        `flex items-center space-x-4 rounded-lg p-3 ${priorityColor} ${
          done_at && "opacity-50 bg-slate-400"
        }`
      )}
    >
      <LoadingIconButton id={id} purpose={done_at ? "undo" : "check"} />
      <p className="flex-1">{title}</p>
      <div className="space-x-1">
        <LoadingIconButton id={id} purpose="edit" />
        <LoadingIconButton id={id} purpose="delete" />
      </div>
    </div>
  );
};

export default TodoItem;
