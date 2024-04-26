import { cn } from "@/lib/utils";
import LoadingIconButton from "../LoadingIconButton";

const TodoItem = ({ todoItem }: { todoItem: Todo }) => {
  const { priority, title, done_at } = todoItem;

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
      priorityColor = "bg-gray-400";
      break;
  }

  return (
    <div
      className={cn(
        `flex items-center space-x-4 rounded-lg p-3 ${
          done_at && "opacity-50"
        } ${priorityColor}`
      )}
    >
      <LoadingIconButton purpose={done_at ? "undo" : "check"} />
      <p className="flex-1">{title}</p>
      <div className="space-x-1">
        <LoadingIconButton purpose="edit" />
        <LoadingIconButton purpose="delete" />
      </div>
    </div>
  );
};

export default TodoItem;
