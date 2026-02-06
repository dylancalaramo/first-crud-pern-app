import { Pencil } from "lucide-react";
import { Button } from "./Button";
import { useEditAndDeleteTaskContext } from "../context/editAndDeleteMode";
import type { TodoArrayType } from "../App";
import { useMemo } from "react";

export const EditButton = ({
  currentTasks,
}: {
  currentTasks: TodoArrayType[] | undefined;
}) => {
  const {
    isEditMode,
    isDeleteMode,
    setIsEditMode,
    setIsDeleteMode,
    deleteTasks,
    editTasks,
  } = useEditAndDeleteTaskContext();

  const toBeDeletedCount = useMemo(() => {
    return currentTasks
      ? currentTasks.filter((row) => row.data.toBeDeleted).length
      : 0;
  }, [currentTasks]);

  const toBeEditedCount = useMemo(() => {
    return currentTasks
      ? currentTasks.filter(
          (row) =>
            row.data.editString !== "" || row.data.deadlineEditString !== ""
        ).length
      : 0;
  }, [currentTasks]);

  const handleEditMode = () => {
    //check if user wants to delete first
    if (isDeleteMode) {
      if (currentTasks && currentTasks.length > 0) {
        //check if there are rows currently selected to be deleted
        const toDeleteIdArray = currentTasks
          .filter((row) => row.data.toBeDeleted)
          .map((row) => {
            return row.id;
          });
        //if there are selected rows
        if (toDeleteIdArray.length > 0) {
          deleteTasks(toDeleteIdArray);
        } else {
          //if there are no selected rows, cancel operation
          console.log("There is nothing to delete or edit");
          return;
        }
        return;
      } else {
        //catch when there are no current rows
        console.log("There is nothing to delete or edit");
      }
    } else if (isEditMode) {
      //check if todos exist
      if (currentTasks && currentTasks.length > 0) {
        //check if any of the todos contain an edit string
        const toEdditArray = currentTasks.filter(
          (task) =>
            task.data.editString !== "" || task.data.deadlineEditString !== ""
        );
        // console.log(toEdditArray);
        if (toEdditArray.length !== 0) {
          //call edit task mutate function to query to server
          editTasks(toEdditArray);
        } else {
          //there are no tasks to edit if edit array is empty
          console.log("There is nothing to delete or edit");
          return;
        }
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
            ? `Save (${toBeEditedCount})`
            : `Delete (${toBeDeletedCount})`}
        </span>
      )}
    </Button>
  );
};
