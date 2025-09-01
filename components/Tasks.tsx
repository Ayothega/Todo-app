"use client";

import * as React from "react";
import Task from "./Task";
import { fetchTasks, type TaskType } from "@/lib/api";
import { useEffect, useState } from "react";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {}
  };

  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72">
            My Tasks
          </p>
        </div>
        {/* List of Tasks */}
        {tasks && tasks.length > 0 ? (
          tasks.map((task: TaskType) => <Task key={task.id} task={task} />)
        ) : (
          <p>There is no task....</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
