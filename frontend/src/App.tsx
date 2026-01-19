import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { useTheme } from "./context/theme";
import { Searchbar } from "./components/Searchbar";
import { TodoContainer } from "./components/TodoContainer";
import { TodoRow } from "./components/TodoRow";
import { AddTaskPopup } from "./components/AddTaskPopup";
import { useState } from "react";
// import { useEffect } from "react";

export interface TodoType {
  id: string;
  task: string;
  created_at: string;
}

const fetchDatabaseData = async (): Promise<TodoType[] | undefined> => {
  try {
    const response = await axios
      .get("http://localhost:5000/")
      .then((response) => {
        return response.data;
      });
    return response as TodoType[];
  } catch (err) {
    console.log(err);
    return;
  }
};

function App() {
  const [popupIsTriggered, setPopupIsTriggered] = useState<boolean>(false);
  const { theme } = useTheme();
  const { data: table } = useQuery({
    queryFn: fetchDatabaseData,
    queryKey: ["database"],
  });

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-neutral-200 *:text-black "
          : "bg-gray-700 *:text-white"
      } 
      w-full min-h-screen h-max pt-3 flex flex-col gap-3`}
    >
      <Navbar trigger={setPopupIsTriggered}></Navbar>
      <div className="mt-10">
        <Searchbar></Searchbar>
      </div>
      <TodoContainer>
        {table ? (
          table!.map((row) => {
            return <TodoRow todo={row} key={row.id} />;
          })
        ) : (
          <div>Your list is empty! Check if the database is running</div>
        )}
      </TodoContainer>
      <AddTaskPopup
        trigger={popupIsTriggered}
        setTrigger={setPopupIsTriggered}
      />
    </div>
  );
}

export default App;
