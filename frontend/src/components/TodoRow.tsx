import { useMemo } from "react";
import type { TodoType } from "../App";
import { useTheme } from "../context/theme";
import { format } from "date-fns";

export const TodoRow = ({ todo }: { todo: TodoType }) => {
  const { theme } = useTheme();
  const date = useMemo(
    () => format(new Date(todo.created_at), "MMMM d, yyyy"),
    [todo.created_at]
  );

  return (
    <div
      className={`${theme === "light" ? "bg-neutral-100" : "bg-gray-800 "}
        grid grid-cols-5 w-full shadow-md
        min-h-10 h-fit *:px-2
        font-roboto
        [&>*:not(:last-child)]:border-r *:w-full *:flex *:items-center *:justify-center`}
    >
      <span>{todo.id}</span>
      <span className="col-span-2">{todo.task}</span>
      <span>{date}</span>
      <span></span>
    </div>
  );
};
