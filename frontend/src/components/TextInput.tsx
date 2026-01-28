import type { ReactNode } from "react";

interface TextInputType {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  id: string;
  children?: ReactNode;
  inputPlaceholder?: string;
}

export const TextInput = ({
  value,
  onChange,
  children,
  inputPlaceholder,
}: TextInputType) => {
  return (
    <div
      className="flex flex-col-reverse p-1 px-3 rounded-2xl w-full  
        transition-all h-full cursor-text relative"
    >
      <input
        type="text"
        id="task"
        className={`${
          children && "mt-2"
        } peer outline-0 h-full w-full text-gray-800`}
        value={value}
        onChange={(e) => onChange(e)}
        autoComplete="off"
        placeholder={inputPlaceholder ? inputPlaceholder : ""}
        required
      ></input>
      <div
        className={`text-gray-500 cursor-text absolute transition-all -translate-y-[50%]
          peer-focus:top-3 peer-focus:text-[0.8rem]
          peer-valid:top-3 peer-valid:text-[0.8rem]
          peer-invalid:top-[50%] peer-invalid: peer-invalid:text-1`}
      >
        {children}
      </div>
    </div>
  );
};
