import { useTheme } from "../context/theme";

export const Searchbar = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme === "light" ? "bg-neutral-100" : "bg-gray-800"}
      h-10 px-7 shadow-md flex flex-row mx-auto w-[80%] max-w-200
      justify-between items-center
      rounded-lg
      md:px-5`}
    ></div>
  );
};
