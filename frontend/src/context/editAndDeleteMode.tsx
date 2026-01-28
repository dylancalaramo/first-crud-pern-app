import {
  useMutation,
  useQueryClient,
  type UseMutateAsyncFunction,
} from "@tanstack/react-query";
import axios from "axios";
import {
  createContext,
  useContext,
  // useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";

interface EditAndDeleteTaskType {
  isEditMode: boolean;
  isDeleteMode: boolean;
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
  setIsDeleteMode: React.Dispatch<SetStateAction<boolean>>;
  deleteTasks: UseMutateAsyncFunction<void, Error, number[]>;
}

const handleDeleteRequest = async (
  toDeleteIdArray: number[]
): Promise<void> => {
  console.log("here");
  return axios
    .delete("http://localhost:5000", {
      data: { ids: toDeleteIdArray },
    })
    .then((response) => {
      console.log(response.status);
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

// const handleEditRequest = async(edit);

const EditAndDeleteTaskContext = createContext<
  EditAndDeleteTaskType | undefined
>(undefined);

export const EditAndDeleteTaskProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   // console.log("Is edit:", isEditMode);
  //   // console.log("Is delete:", isDeleteMode);
  //   // console.log(taskQueryArray);
  // }, [isDeleteMode, taskQueryArray]);

  const { mutateAsync: deleteTasks } = useMutation({
    mutationFn: (taskIds: number[]) => handleDeleteRequest(taskIds),
    onSuccess: () => {
      setIsEditMode(false);
      setIsDeleteMode(false);

      queryClient.invalidateQueries({
        queryKey: ["database"],
      });
    },
  });

  return (
    <EditAndDeleteTaskContext.Provider
      value={{
        isEditMode,
        isDeleteMode,
        setIsEditMode,
        setIsDeleteMode,
        deleteTasks,
      }}
    >
      {children}
    </EditAndDeleteTaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditAndDeleteTaskContext = () => {
  const context = useContext(EditAndDeleteTaskContext);
  if (!context)
    throw new Error(
      "useEditAndDeleteTaskContext must be used inside the provider"
    );
  return context;
};
