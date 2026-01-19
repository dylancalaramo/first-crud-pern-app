import type { ReactNode } from "react";

interface ButtonType {
  children?: ReactNode;
  action?: () => void;
}

export const Button = ({ children, action }: ButtonType) => {
  return (
    <button
      className="bg-gray-700 text-white rounded-md p-2 font-bree-serif 
          shadow-[0_0_0_2px_rgb(54,65,83)_inset,0_4px_3px_0px_rgb(209,213,220)_inset,0_8px_3px_0px_rgb(106,114,130)_inset]
          outline-1 outline-gray-500 cursor-pointer"
      onClick={action}
    >
      {children}
    </button>
  );
};
