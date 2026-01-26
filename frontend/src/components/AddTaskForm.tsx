import { useRef, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDate } from "date-fns";

const handleSubmit = async ({
  task,
  date,
}: {
  task: string;
  date: string;
}): Promise<void> => {
  // console.log(task, date);
  // try {
  // } catch (err) {
  //   console.log(err);
  //   return;
  // }
  return axios
    .post("http://localhost:5000/", {
      task: task,
      deadline: date,
    })
    .then((response) => {
      console.log(response);
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

export const AddTaskForm = () => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 255) {
      setTaskInput(e.target.value);
    }
  };

  const { mutateAsync: addTodo } = useMutation({
    mutationFn: ({ task, date }: { task: string; date: string }) => {
      return handleSubmit({ task, date });
    },
    onSuccess: () => {
      setTaskInput("");
      setDateInput("");
      queryClient.invalidateQueries({
        queryKey: ["database"],
      });
    },
  });

  return (
    <form
      className="bg-gray-700 flex flex-col gap-3 md:px-7 px-5 mt-5 w-full text-white rounded-b-lg"
      action={() => addTodo({ task: taskInput, date: dateInput })}
    >
      <div
        className="flex flex-col-reverse p-1 px-3 rounded-2xl w-full bg-neutral-200 
        transition-all h-15 cursor-text shadow-[0_1px_0_1px_rgb(161,161,161)] relative"
      >
        <input
          type="text"
          id="task"
          ref={taskInputRef}
          className={`peer outline-0 h-full mt-2 w-full text-gray-800`}
          value={taskInput}
          onChange={(e) => handleTaskInput(e)}
          autoComplete="off"
          required
        ></input>
        <div
          className={`text-gray-500 cursor-text absolute transition-all -translate-y-[50%]
          peer-focus:top-3 peer-focus:text-[0.8rem]
          peer-valid:top-3 peer-valid:text-[0.8rem]
          peer-invalid:top-[50%] peer-invalid: peer-invalid:text-1`}
        >
          <label htmlFor="task">Task</label>
          <span
            className={`${taskInput ? "visible" : "invisible"} ${
              taskInput.length > 234 ? "text-red-400" : "text-gray-500"
            } ml-2`}
          >
            {255 - taskInput.length}
          </span>
        </div>
      </div>

      <div
        className="flex flex-row gap-3 p-3 items-center rounded-2xl bg-neutral-200 
        transition-all h-15 shadow-[0_1px_0_1px_rgb(161,161,161)] relative min-w-[50%] w-fit"
      >
        <label
          htmlFor="date"
          className="text-gray-500 border-r border-gray-400 pr-3 cursor-default"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="w-full rounded-lg bg-neutral-200 outline-none
          placeholder-gray-500 text-gray-800 cursor-text"
          required
        />
      </div>
      <div className="self-end">
        <Button action={() => addTodo}>
          <span>Add task</span>
        </Button>
      </div>
    </form>
  );
};
