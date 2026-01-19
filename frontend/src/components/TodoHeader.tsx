import { useTheme } from "../context/theme";

export const TodoHeader = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme === "light" ? "bg-neutral-100" : "bg-gray-800 "}
        grid grid-cols-5 w-full shadow-md font-bold h-7 rounded-tl-md rounded-tr-md *:px-2
        [&>*:not(:last-child)]:border-r *:w-full *:flex *:justify-center *:items-center`}
    >
      <span>ID</span>
      <span className="col-span-2">Task</span>
      <span>Created at</span>
      <span>Options</span>
    </div>
  );
};
