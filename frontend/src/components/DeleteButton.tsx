import { Trash, X } from "lucide-react";
import { Button } from "./Button";
import { useEditAndDeleteTaskContext } from "../context/editAndDeleteMode";
import type { SetStateAction } from "react";
import type { TodoArrayType } from "../App";

export const DeleteButton = ({
  currentTasks,
  setCurrentTasks,
}: {
  currentTasks: TodoArrayType[] | undefined;
  setCurrentTasks: React.Dispatch<SetStateAction<TodoArrayType[] | undefined>>;
}) => {
  const { isEditMode, isDeleteMode, setIsDeleteMode, setIsEditMode } =
    useEditAndDeleteTaskContext();

  const handleDeleteMode = () => {
    setIsEditMode(false);
    setIsDeleteMode((prev) => (prev ? false : true));
    if (currentTasks) {
      setCurrentTasks(
        [...currentTasks].map((row) => ({
          ...row,
          data: {
            ...row.data,
            editString: "",
            toBeDeleted: false,
          },
        }))
      );
    }
  };

  const handleCancel = () => {
    setIsDeleteMode(false);
    setIsEditMode(false);
  };

  return (
    <Button
      action={isEditMode || isDeleteMode ? handleCancel : handleDeleteMode}
    >
      {!isEditMode && !isDeleteMode ? (
        <div className="flex flex-row items-center justify-center md:w-20 w-fit">
          <Trash className="md:mr-1" />
          <span className="md:block hidden">Delete</span>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center md:w-20 w-fit">
          <X className="md:mr-1" />
          <span className="md:block hidden">Cancel</span>
        </div>
      )}
    </Button>
  );
};
