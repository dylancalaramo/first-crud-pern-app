import { Trash } from "lucide-react";
import { useEditAndDeleteTaskContext } from "../context/editAndDeleteMode";
import { useTheme } from "../context/theme";

export const TodoHeader = () => {
  const { theme } = useTheme();
  const { isDeleteMode } = useEditAndDeleteTaskContext();
  return (
    <div
      className={`
         ${
           theme === "light"
             ? "bg-neutral-100 *:border-gray-300"
             : "bg-gray-800 *:border-gray-700"
         }
        grid ${
          isDeleteMode ? "grid-cols-10" : "grid-cols-4"
        } w-full shadow-md font-bold h-10 rounded-tl-md rounded-tr-md
         *:w-full *:flex *:justify-center *:items-center [&>span:not(#end)]:border-r`}
    >
      <span className={`${isDeleteMode ? "col-span-5" : "col-span-2"}`}>
        Task
      </span>
      <span className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}>
        Deadline
      </span>
      <span
        className={`${isDeleteMode ? "col-span-2" : "col-span-1"}`}
        id="end"
      >
        Created at
      </span>
      {isDeleteMode && (
        <div className={`${isDeleteMode ? "block" : "hidden"}`}>
          <Trash height={20} />
        </div>
      )}
    </div>
  );
};
