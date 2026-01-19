import type { ReactNode } from "react";
import { useTheme } from "../context/theme";
import { TodoHeader } from "./TodoHeader";

export const TodoContainer = ({ children }: { children?: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`
        ${
          theme === "light"
            ? "bg-neutral-400 **:border-stone-300"
            : "bg-slate-900 **:border-gray-700"
        }
        flex flex-col min-h-[80%] h-fit w-[80%] max-w-200 mx-auto rounded-md
        justify-between items-center shadow-md 
        font-open-sans md:text-base text-xs`}
    >
      <TodoHeader />
      <div className="pt-1 flex flex-col gap-1 w-full *:last:rounded-b-md">
        {children}
      </div>
    </div>
  );
};
