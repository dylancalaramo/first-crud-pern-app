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

export interface TodoType {
  id: number;
  task: string;
  created_at: string;
  deadline: string;
  // isEdit: boolean;
  // isDelete: boolean;
}

const fetchDatabaseData = async (): Promise<TodoType[] | undefined> => {
  try {
    return await axios.get("http://localhost:5000/").then((response) => {
      const currentTasks = response.data;
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
  const [currentTasks, setCurrentTasks] = useState<TodoType[] | undefined>(
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
          <EditButton />
          <DeleteButton />
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
