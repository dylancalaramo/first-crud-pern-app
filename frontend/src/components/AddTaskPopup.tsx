import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type SetStateAction,
} from "react";
import { X } from "lucide-react";
import { useTheme } from "../context/theme";

interface Popup {
  trigger: boolean;
  setTrigger: React.Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

export const AddTaskPopup = ({ trigger, children, setTrigger }: Popup) => {
  const { theme } = useTheme();
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(
    (event: React.MouseEvent) => {
      if ((event.target as Element).id === backgroundRef.current?.id) {
        setTrigger(false);
      }
    },
    [setTrigger]
  );

  useEffect(() => {
    if (backgroundRef) {
      document.addEventListener("onclick", () => handleClose);
    }
    return () => {
      document.removeEventListener("onclick", () => handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return trigger ? (
    <div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center
    bg-[rgb(0,0,0,0.5)]"
      onClick={(e) => handleClose(e)}
      id="background"
      ref={backgroundRef}
    >
      <div
        className={`${theme === "light" ? "bg-neutral-100" : "bg-gray-800"}
        h-20 w-[50%]`}
      >
        <span className="select-none">Add task</span>
        <button onClick={() => setTrigger(false)}>
          <X color="red" />
        </button>
      </div>
      {children}
    </div>
  ) : (
    <></>
  );
};
