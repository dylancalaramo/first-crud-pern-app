import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type SetStateAction,
} from "react";
import type { TodoArrayType } from "../App";
import { useTheme } from "../context/theme";
import { format } from "date-fns";
import { useEditAndDeleteTaskContext } from "../context/editAndDeleteMode";
import { TextInput } from "./TextInput";

export const TodoRow = ({
  todo,
  setCurrentTasks,
  currentTasks,
}: {
  todo: TodoArrayType;
  setCurrentTasks: React.Dispatch<SetStateAction<TodoArrayType[] | undefined>>;
  currentTasks: TodoArrayType[];
}) => {
  const { theme } = useTheme();
  const { isEditMode, isDeleteMode } = useEditAndDeleteTaskContext();
  const [taskEditInput, setTaskEditInput] = useState<string>("");
  const deleteCheckboxRef = useRef<HTMLInputElement | null>(null);

  const createdDate = useMemo(
    () => format(new Date(todo.data.created_at), "MMMM d, yyyy"),
    [todo]
  );
  const deadline = useMemo(
    () => format(new Date(todo.data.deadline), "MMMM d, yyyy"),
    [todo]
  );

  const handleDelete = () => {
    //if checkbox is checked
    //setToBeDeleted to true
    if (deleteCheckboxRef.current?.checked) {
      setCurrentTasks(
        [
          ...currentTasks.filter((task: TodoArrayType) => task.id !== todo.id),
          {
            ...todo,
            data: {
              ...todo.data,
              toBeDeleted: true,
            },
          },
        ].sort((taskA, taskB) => taskA.id - taskB.id)
      );
    } else {
      setCurrentTasks(
        [
          ...currentTasks.filter((task: TodoArrayType) => task.id !== todo.id),
          {
            ...todo,
            data: {
              ...todo.data,
              toBeDeleted: false,
            },
          },
        ].sort((taskA, taskB) => taskA.id - taskB.id)
      );
    }
  };

  //resets edit task input state,
  //whenever user leaves delete task mode
  useEffect(() => {
    const handleEditReset = () => {
      if (!isEditMode) {
        setTaskEditInput("");
      } else {
        setTaskEditInput(todo.data.task);
      }
    };
    handleEditReset();
  }, [isEditMode, todo.data.task]);

  useEffect(() => {
    if (taskEditInput !== todo.data.task && taskEditInput !== "") {
      setCurrentTasks(
        [
          ...currentTasks.filter((row) => row.id !== todo.id),
          {
            ...todo,
            data: {
              ...todo.data,
              editString: taskEditInput,
            },
          },
        ].sort((taskA, taskB) => taskA.id - taskB.id)
      );
    } else {
      setCurrentTasks(
        [
          ...currentTasks.filter((row) => row.id !== todo.id),
          {
            ...todo,
            data: {
              ...todo.data,
              editString: "",
            },
          },
        ].sort((taskA, taskB) => taskA.id - taskB.id)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskEditInput]);

  // useEffect(() => {
  //   console.log(currentTasks);
  // }, [currentTasks]);

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-neutral-100 *:border-gray-300"
          : "bg-gray-800 *:border-gray-700"
      }
        grid ${isDeleteMode ? "grid-cols-10" : "grid-cols-4"}
        w-full shadow-md
        min-h-15 h-fit font-roboto overflow-auto
        [&>*:not(#end)]:border-r 
        *:w-full *:flex *:items-center *:justify-center *:px-4`}
    >
      {!isEditMode ? (
        <>
          <span className={`${isDeleteMode ? "col-span-5" : "col-span-2"}`}>
            {todo.data.task}
          </span>
          <span className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}>
            {deadline}
          </span>
          <span
            className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}
            id="end"
          >
            {createdDate}
          </span>
        </>
      ) : (
        <div className="w-full h-full col-span-2">
          <div
            className={`
            ${
              taskEditInput === ""
                ? //if text input field is empty
                  "border-red-400"
                : taskEditInput !== todo.data.task
                ? "border-blue-500"
                : //if there's no change in task input
                  "border-gray-500"
            }
            ${theme === "light" ? "**:text-black" : "**:text-gray-300"}
            border-b-2 w-full h-[2.5em] transition-all`}
          >
            <TextInput
              value={taskEditInput}
              onChange={(e) => setTaskEditInput(e.target.value)}
              id={`task-${todo.id}`}
              inputPlaceholder={todo.data.task}
            ></TextInput>
          </div>
        </div>
      )}

      {isDeleteMode && (
        <div className={`${isDeleteMode ? "block" : "hidden"}`} id="end">
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
