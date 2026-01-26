import { type ReactNode } from "react";

interface ButtonType {
  children?: ReactNode;
  action?: () => void;
  color?: string;
  shadowColor1?: string;
  shadowColor2?: string;
  outline?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

export const Button = ({
  children,
  action,
  color,
  outline,
  shadowColor1,
  shadowColor2,
  type,
}: ButtonType) => {
  //prettier-ignore

  // console.log(shadowString);
  return (
    <button
      className={`${color ? `bg-[${color}]` : "bg-gray-700"}
      ${outline ? `outline-${outline}` : "outline-gray-500"}
      outline-1 cursor-pointer text-white rounded-md p-2 font-league-spartan`}
      //tailwind can't accept props to dynamically change the css properties
      //resorted to inline styles for dynamic colors
      style={{
        boxShadow: `inset 0 0 0 2px ${color ? `${color}` : "rgb(54,65,83)"},
        inset 0 4px 3px 0px ${shadowColor1 ? shadowColor1 : "rgb(209,213,220)"},
        inset 0 8px 3px 0px ${shadowColor2 ? shadowColor2 : "rgb(106,114,130)"}`,
        background: `${color ? color : "#364153"}` //#364153 = bg-gray-700
      }}
      onClick={action ? action : undefined}
      type={type ? type : undefined}
    >
      {children}
    </button>
  );
};
