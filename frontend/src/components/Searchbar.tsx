import { useEffect, useState, type SetStateAction } from "react";
import type { TodoType } from "../App";
import { useTheme } from "../context/theme";

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
    h-12 flex flex-col-reverse justify-center rounded-md w-[50%] px-3 relative shadow-[0_3px_0_0]`}
    >
      <input
        type="text"
        id="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        required
        className="peer h-full outline-none mt-2"
      />
      <label
        className="transition-all absolute text-gray-500 -translate-y-[50%]
          peer-focus:text-[0.8rem] peer-focus:top-3 
          peer-valid:text-[0.8rem] peer-valid:top-3
          peer-invalid:text-1 peer-invalid:top-[50%]"
        htmlFor="search"
      >
        Search Task
      </label>
    </div>
  );
};
