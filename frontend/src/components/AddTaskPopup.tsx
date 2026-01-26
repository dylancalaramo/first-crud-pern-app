import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type SetStateAction,
} from "react";
import { X } from "lucide-react";
// import { useTheme } from "../context/theme";
import { Button } from "./Button";

interface Popup {
  trigger: boolean;
  setTrigger: React.Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  title?: string;
}

export const AddTaskPopup = ({
  trigger,
  children,
  setTrigger,
  title,
}: Popup) => {
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
    bg-[rgb(0,0,0,0.5)] rounded-b-lg"
      onClick={(e) => handleClose(e)}
      id="background"
      ref={backgroundRef}
    >
      <div
        className={`bg-gray-700
        h-fit md:min-w-[50%] min-w-[70%] w-fit rounded-lg
        shadow-[inset_0_0_0_4px_rgb(54,65,83),inset_0_7px_5px_0px_rgb(209,213,220),inset_0_16px_5px_0px_rgb(106,114,130)] py-5`}
      >
        <div className="w-full flex flex-row md:px-7 px-5  font-league-spartan items-center justify-between text-white">
          <span className="text-2xl select-none">{title}</span>
          <div>
            <Button
              action={() => setTrigger(false)}
              color="rgb(235,64,52)"
              shadowColor1="rgb(254,226,230)"
              shadowColor2="rgb(255,162,162)"
            >
              <X color="white" strokeWidth={5} />
            </Button>
          </div>
        </div>
        <div className="bg-gray-800 rounded-b-lg">{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};
