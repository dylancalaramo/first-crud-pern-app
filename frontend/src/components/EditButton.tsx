import { Pencil } from "lucide-react";
import { Button } from "./Button";
import { useEditAndDeleteTaskContext } from "../context/editAndDeleteMode";

export const EditButton = () => {
  const {
    isEditMode,
    isDeleteMode,
    taskQueryArray,
    setIsEditMode,
    setIsDeleteMode,
    deleteTasks,
  } = useEditAndDeleteTaskContext();

  const handleEditMode = () => {
    if (isDeleteMode) {
      if (taskQueryArray.length > 0) {
        deleteTasks(taskQueryArray);
        return;
      } else {
        console.log("There is nothing to delete or edit");
      }
    } else if (isEditMode) {
      //add edit function
      if (taskQueryArray.length > 0) {
        return;
      } else {
        console.log("There is nothing to delete or edit");
        return;
      }
    } else {
      //is not in edit mode or delete mode
      setIsDeleteMode(false);
      setIsEditMode(true);
    }
  };

  return (
    <Button action={handleEditMode}>
      {!isEditMode && !isDeleteMode ? (
        <div className="flex flex-row items-center justify-center md:w-20 w-fit">
          <Pencil className="md:mr-2" />
          <span className="md:block hidden">Edit</span>
        </div>
      ) : (
        <span>
          {isEditMode
            ? `Save (${taskQueryArray.length})`
            : `Delete (${taskQueryArray.length})`}
        </span>
      )}
    </Button>
  );
};
