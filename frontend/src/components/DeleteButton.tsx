import { Trash, X } from "lucide-react";
import { Button } from "./Button";
import { useEditAndDeleteTaskContext } from "../context/editAndDeleteMode";

export const DeleteButton = () => {
  const {
    isEditMode,
    isDeleteMode,
    setIsDeleteMode,
    setIsEditMode,
    setTaskQueryArray,
  } = useEditAndDeleteTaskContext();

  const handleDeleteMode = () => {
    setIsEditMode(false);
    setIsDeleteMode((prev) => (prev ? false : true));
    setTaskQueryArray([]);
  };

  const handleCancel = () => {
    setIsDeleteMode(false);
    setIsEditMode(false);
    setTaskQueryArray([]);
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
        <X />
      )}
    </Button>
  );
};
