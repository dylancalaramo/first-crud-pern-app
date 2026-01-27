import { useEffect, useState, type SetStateAction } from "react";
import type { TodoType } from "../App";
import { useTheme } from "../context/theme";
import { TextInput } from "./TextInput";

export const Searchbar = ({
  // currentTasks
  setCurrentTasks,
  table,
}: {
  // currentTasks: TodoType[] | undefined;
  table: TodoType[] | undefined;
  setCurrentTasks: React.Dispatch<SetStateAction<TodoType[] | undefined>>;
}) => {
  const { theme } = useTheme();
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    setCurrentTasks(
      table?.filter((row) =>
        row.task.toLowerCase().startsWith(searchInput.toLowerCase())
      )
    );
  }, [searchInput, setCurrentTasks, table]);
  return (
    <div
      className={`${
        theme === "light"
          ? "bg-neutral-100 shadow-[rgb(161,161,161)]"
          : "bg-gray-800 shadow-slate-900"
      }
    h-12 justify-center w-[50%] rounded-2xl shadow-[0_3px_0_0]`}
    >
      <TextInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        id="search"
      >
        <label htmlFor="search">Search Task</label>
      </TextInput>
    </div>
  );
};
