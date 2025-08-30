import * as React from "react";
import { tasksData } from "../data/data";
import Task from "./Task";
import { Task as TaskType } from "../types/Tasks";

const Tasks: React.FC = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72">
            My Tasks
          </p>
        </div>
        {/* List of Tasks */}
        {tasksData && tasksData.length > 0 ? (
          tasksData.map((task: TaskType) => <Task key={task.id} task={task} />)
        ) : (
          <p>There is no task....</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
