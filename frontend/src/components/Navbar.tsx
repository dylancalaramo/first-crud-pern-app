import { useTheme } from "../context/theme";
import { Sun, Moon } from "lucide-react";
import { Button } from "./Button";

interface PopupProps {
  trigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ trigger }: PopupProps) => {
  const { theme, toggleTheme } = useTheme();
  const changeTheme = () => {
    //   theme = theme === "light" ? "dark" : "light";
    toggleTheme();
    console.log(theme);
  };

  return (
    <div
      className={`${theme === "light" ? "bg-neutral-100" : "bg-gray-800"}
      h-13 px-7 shadow-md flex flex-row mx-auto w-[80%] max-w-200
      justify-between items-center
      rounded-lg
      md:px-5`}
    >
      <span className="font-bree-serif text-2xl select-none">
        CRUD Todo List
      </span>
      <div className="flex flex-row gap-4">
        <Button action={() => trigger(true)}>
          <span>Add a task</span>
        </Button>

        <Button action={changeTheme}>
          {theme === "light" ? <Sun></Sun> : <Moon></Moon>}
        </Button>
      </div>
    </div>
  );
};
