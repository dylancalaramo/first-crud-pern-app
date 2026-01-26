import { useTheme } from "../context/theme";
import { Sun, Moon, Plus } from "lucide-react";
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
      h-13 px-5 shadow-md flex flex-row mx-auto w-[80%] max-w-200
      justify-between items-center rounded-lg`}
    >
      <span className="font-league-spartan text-2xl select-none">
        CRUD Todo List
      </span>
      <div className="flex gap-4 items-center">
        <Button action={() => trigger(true)}>
          <div className="flex flex-row items-center">
            <Plus className="md:mr-1" />
            <span className="md:block hidden">Add a task</span>
          </div>
        </Button>

        <Button action={changeTheme}>
          {theme === "light" ? <Sun></Sun> : <Moon></Moon>}
        </Button>
      </div>
    </div>
  );
};
