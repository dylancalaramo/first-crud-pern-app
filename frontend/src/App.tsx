import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { useTheme } from "./context/theme";
import { Searchbar } from "./components/Searchbar";
import { TodoContainer } from "./components/TodoContainer";
import { TodoRow } from "./components/TodoRow";
import { AddTaskPopup } from "./components/AddTaskPopup";
import { useEffect, useState } from "react";
import { AddTaskForm } from "./components/AddTaskForm";
import { EditButton } from "./components/EditButton";
import { DeleteButton } from "./components/DeleteButton";
// import { useEffect } from "react";
export interface TodoDataType {
  task: string;
  created_at: string;
  deadline: string;
  editString: string;
  toBeDeleted: boolean;
}

export interface TodoArrayType {
  id: number;
  data: TodoDataType;
}

const fetchDatabaseData = async (): Promise<TodoArrayType[] | undefined> => {
  try {
    return await axios.get("http://localhost:5000/").then((response) => {
      // const currentTasks = [
      //   { ...response.data, editString: "", toBeDeleted: false },
      // ];
      const currentTasks: TodoArrayType[] = response.data.map(
        (todo: TodoArrayType) => ({
          id: todo.id,
          data: {
            task: todo.data.task,
            created_at: todo.data.created_at,
            deadline: todo.data.deadline,
            editString: "",
            toBeDeleted: false,
          },
        })
      );

      // console.log(currentTasks);
      return currentTasks;
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

function App() {
  const [popupIsTriggered, setPopupIsTriggered] = useState<boolean>(false);
  const { theme } = useTheme();
  const [currentTasks, setCurrentTasks] = useState<TodoArrayType[] | undefined>(
    undefined
  );
  const { data: queriedData } = useQuery({
    queryFn: fetchDatabaseData,
    queryKey: ["database"],
    refetchOnMount: true,
  });

  useEffect(() => {
    setCurrentTasks(queriedData);
  }, [queriedData]);

  // //handles automatic sorting of task array whenever:
  // //row delete checkbox is selected,
  // //searching for row, etc
  // //can be changed in the future to add sort feature
  // useEffect(() => {
  //   if (currentTasks) {
  //     setCurrentTasks(
  //       [...currentTasks].sort((taskA, taskB) => taskA.id - taskB.id)
  //     );
  //   }
  // }, [currentTasks]);

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-neutral-200 *:text-black "
          : "bg-gray-700 *:text-white"
      } 
      w-full min-h-screen h-max py-3 flex flex-col gap-3`}
    >
      <Navbar trigger={setPopupIsTriggered}></Navbar>
      <div className="mx-auto w-[80%] max-w-200 flex flex-row items-center justify-between px-5">
        <Searchbar
          setCurrentTasks={setCurrentTasks}
          table={queriedData}
        ></Searchbar>
        <div className="h-full flex gap-4">
          <EditButton currentTasks={currentTasks} />
          <DeleteButton
            currentTasks={currentTasks}
            setCurrentTasks={setCurrentTasks}
          />
        </div>
      </div>

      <TodoContainer>
        {currentTasks ? (
          currentTasks!.map((row) => {
            return (
              <TodoRow
                todo={row}
                key={row.id}
                setCurrentTasks={setCurrentTasks}
                currentTasks={currentTasks}
              />
            );
          })
        ) : (
          <div>Your list is empty! Check if the database is running</div>
        )}
      </TodoContainer>
      <AddTaskPopup
        trigger={popupIsTriggered}
        setTrigger={setPopupIsTriggered}
        title={"Add todo"}
      >
        <AddTaskForm />
      </AddTaskPopup>
    </div>
  );
}

export default App;
