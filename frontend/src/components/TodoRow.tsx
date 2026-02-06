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
  const [taskEditInput, setTaskEditInput] = useState<string>(
    todo.data.task || ""
  );
  const [deadlineEditInput, setDeadlineEditInput] = useState<string>(
    //yyyy-MM-dd is the standard format for html date inputs
    //format cannot be changed
    format(new Date(todo.data.deadline), "yyyy-MM-dd") || ""
  );
  const deleteCheckboxRef = useRef<HTMLInputElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  //formated timestamptz to MMMM d, yyyy to display on frontend
  const createdDate = useMemo(
    () => format(new Date(todo.data.created_at), "MMMM d, yyyy"),
    [todo]
  );
  //formated yyyy-MM-dd to MMMM d, yyyy to display on frontend
  const deadlineFormatted = useMemo(
    () => format(new Date(todo.data.deadline), "MMMM d, yyyy"),
    [todo]
  );

  const deadlineEditInputFormatted = useMemo(() => {
    //set date back to initial deadline date to avoid crash from inputting an empty
    //string in format new Date function when user clicks clear in deadline input field
    if (deadlineEditInput !== "") {
      return format(new Date(deadlineEditInput), "MMMM d, yyyy");
    } else {
      return deadlineFormatted;
    }
  }, [deadlineEditInput, deadlineFormatted]);

  const handleDelete = () => {
    //if checkbox is checked
    //setToBeDeleted to true
    console.log("is checked:", deleteCheckboxRef.current?.checked);
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

  //resets edit task input state whenever user leaves delete task mode
  useEffect(() => {
    const handleEditReset = () => {
      if (!isEditMode) {
        setTaskEditInput("");
        setDeadlineEditInput(
          format(new Date(todo.data.deadline), "yyyy-MM-dd")
        );
      } else {
        setTaskEditInput(todo.data.task);
      }
    };
    handleEditReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);

  // useEffect(() => {
  //   console.log(deadlineEditInput);
  //   // console.log(deadline);
  //   console.log(format(new Date(todo.data.deadline), "dd/mm/yyyy"));
  // }, [deadlineEditInput]);

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

  useEffect(() => {
    if (
      deadlineEditInputFormatted !== deadlineFormatted &&
      deadlineEditInput !== ""
    ) {
      setCurrentTasks(
        [
          ...currentTasks.filter((row) => row.id !== todo.id),
          {
            ...todo,
            data: {
              ...todo.data,
              deadlineEditString: new Date(deadlineEditInput)
                .getTime()
                .toString(),
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
              deadlineEditString: "",
            },
          },
        ].sort((taskA, taskB) => taskA.id - taskB.id)
      );
    }
  }, [deadlineEditInput]);

  // useEffect(() => {
  //   console.log(deadlineEditInputFormatted !== deadlineFormatted);
  //   console.log(format(new Date(deadlineEditInput).getTime(), "yyyy-m-dd"));
  //   console.log(new Date(deadlineEditInput).getTime().toString());
  // }, [deadlineEditInput]);

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
            {deadlineFormatted}
          </span>
          <span
            className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}
            id="end"
          >
            {createdDate}
          </span>
        </>
      ) : (
        <>
          <div className="w-full h-full col-span-2">
            <div
              className={`${
                // taskEditInput !== todo.data.task
                //   ? taskEditInput === ""
                //     ? //if the text input is empty (invalid)
                //       "border-red-400"
                //     : //if text input field is different from the original task
                //       "border-blue-500"
                //   : "border-gray-500"
                taskEditInput === ""
                  ? "border-red-400"
                  : taskEditInput !== todo.data.task
                  ? "border-blue-500"
                  : "border-gray-500"
              }
            ${theme === "light" ? "**:text-black" : "**:text-gray-300"}
            border-b-2 w-full h-[2.5em]`}
            >
              <TextInput
                value={taskEditInput}
                onChange={(e) => setTaskEditInput(e.target.value)}
                id={`task-${todo.id}`}
                inputPlaceholder={todo.data.task}
              ></TextInput>
            </div>
          </div>
          <div className="w-full h-full col-span-1">
            <div
              className={`
            ${
              deadlineFormatted !== deadlineEditInputFormatted
                ? deadlineEditInputFormatted === ""
                  ? //if the deadline input is empty (invalid)
                    "border-red-400"
                  : //if text input field is different from the original task
                    "border-blue-500"
                : "border-gray-500"
            }
              border-b-2 w-full h-[2.5em] transition-all flex items-center`}
            >
              <input
                type="date"
                className="h-0 absolute invisible"
                value={deadlineEditInput}
                id="date-input"
                ref={dateInputRef}
                onChange={(e) => setDeadlineEditInput(e.target.value)}
              ></input>
              <label
                htmlFor="date-input"
                className="mx-auto"
                onClick={() => {
                  if (dateInputRef.current) {
                    dateInputRef.current.showPicker();
                  }
                }}
              >
                {deadlineEditInputFormatted}
              </label>
            </div>
          </div>
          <div className="w-full h-full col-span-1">{createdDate}</div>
        </>
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
