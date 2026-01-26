import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type SetStateAction,
} from "react";
import type { TodoType } from "../App";
import { useTheme } from "../context/theme";
import { format } from "date-fns";
import { useEditAndDeleteTaskContext } from "../context/editAndDeleteMode";

export const TodoRow = ({
  todo,
}: {
  todo: TodoType;
  setCurrentTasks: React.Dispatch<SetStateAction<TodoType[] | undefined>>;
}) => {
  const { theme } = useTheme();
  const { isDeleteMode, taskQueryArray, setTaskQueryArray } =
    useEditAndDeleteTaskContext();
  const [toBeDeleted, setToBeDeleted] = useState<boolean>(false);
  const deleteCheckboxRef = useRef<HTMLInputElement | null>(null);

  const createdDate = useMemo(
    () => format(new Date(todo.created_at), "MMMM d, yyyy"),
    [todo.created_at]
  );
  const deadline = useMemo(
    () => format(new Date(todo.deadline), "MMMM d, yyyy"),
    [todo.deadline]
  );

  useEffect(() => {
    // const exists = taskQueryArray.includes(todo.id);

    // if (exists) {
    //   setTaskQueryArray(taskQueryArray.filter((id) => id !== todo.id));
    // } else {
    //   setTaskQueryArray([...taskQueryArray, todo.id]);
    // }
    // // if (deleteCheckboxRef.current?.checked) {
    // //   if (taskQueryArray.includes(todo.id)) {
    // //     setTaskQueryArray([...taskQueryArray, todo.id]);
    // //   } else {

    // //   }
    // // }
    if (toBeDeleted) {
      setTaskQueryArray([...taskQueryArray, todo.id]);
    } else {
      setTaskQueryArray(taskQueryArray.filter((id) => id !== todo.id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toBeDeleted]);

  return (
    <div
      className={`${theme === "light" ? "bg-neutral-100" : "bg-gray-800"}
        grid ${isDeleteMode ? "grid-cols-9" : "grid-cols-4"}
        w-full shadow-md
        min-h-15 h-fit font-roboto overflow-auto
        [&>span:not(#end)]:border-r 
        *:w-full *:flex *:items-center *:justify-center *:px-4`}
    >
      <span className={`${isDeleteMode ? "col-span-4" : "col-span-2"}`}>
        {todo.task}
      </span>
      <span className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}>
        {deadline}
      </span>
      <span className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}>
        {createdDate}
      </span>
      {isDeleteMode && (
        <div className={`${isDeleteMode ? "block" : "hidden"}`}>
          <input
            type="checkbox"
            value="yes"
            ref={deleteCheckboxRef}
            onChange={() =>
              setToBeDeleted(deleteCheckboxRef.current?.checked ? true : false)
            }
          />
        </div>
      )}
    </div>
  );
};
