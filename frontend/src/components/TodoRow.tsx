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
import { TextInput } from "./TextInput";

export const TodoRow = ({
  todo,
}: {
  todo: TodoType;
  setCurrentTasks: React.Dispatch<SetStateAction<TodoType[] | undefined>>;
}) => {
  const { theme } = useTheme();
  const { isEditMode, isDeleteMode, taskQueryArray, setTaskQueryArray } =
    useEditAndDeleteTaskContext();
  const [taskEditInput, setTaskEditInput] = useState<string>("");
  const deleteCheckboxRef = useRef<HTMLInputElement | null>(null);

  const createdDate = useMemo(
    () => format(new Date(todo.created_at), "MMMM d, yyyy"),
    [todo.created_at]
  );
  const deadline = useMemo(
    () => format(new Date(todo.deadline), "MMMM d, yyyy"),
    [todo.deadline]
  );

  const handleDelete = () => {
    if (deleteCheckboxRef.current?.checked) {
      setTaskQueryArray([...taskQueryArray, todo.id]);
    } else {
      setTaskQueryArray(taskQueryArray.filter((id) => id !== todo.id));
    }
  };

  useEffect(() => {
    const handleEditReset = () => {
      if (!isEditMode) {
        setTaskEditInput("");
      } else {
        setTaskEditInput(todo.task);
      }
    };
    handleEditReset();
  }, [isEditMode, todo.task]);

  return (
    <div
      className={`${theme === "light" ? "bg-neutral-100" : "bg-gray-800"}
        grid ${isDeleteMode ? "grid-cols-10" : "grid-cols-4"}
        w-full shadow-md
        min-h-15 h-fit font-roboto overflow-auto
        [&>span:not(#end)]:border-r 
        *:w-full *:flex *:items-center *:justify-center *:px-4`}
    >
      {!isEditMode ? (
        <>
          <span className={`${isDeleteMode ? "col-span-5" : "col-span-2"}`}>
            {todo.task}
          </span>
          <span className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}>
            {deadline}
          </span>
          <span className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}>
            {createdDate}
          </span>
        </>
      ) : (
        <>
          <div className="w-full col-span-2">
            <TextInput
              value={taskEditInput}
              onChange={(e) => setTaskEditInput(e.target.value)}
              id={`task-${todo.id}`}
            ></TextInput>
          </div>
        </>
      )}

      {isDeleteMode && (
        <div className={`${isDeleteMode ? "block" : "hidden"}`}>
          <input
            type="checkbox"
            value="yes"
            ref={deleteCheckboxRef}
            onChange={() => handleDelete()}
          />
        </div>
      )}
    </div>
  );
};
