"use client";

import * as React from "react";
import Task from "./Task";
import { fetchTasks, type TaskType } from "@/lib/api";
import { useEffect, useState } from "react";

interface TasksProps {
  refreshTrigger: number;
}

const Tasks: React.FC<TasksProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  const handleTaskDeleted = () => {
    // Trigger a refresh of the tasks list
    loadTasks();
  };

  const handleTaskUpdated = () => {
    // Trigger a refresh of the tasks list
    loadTasks();
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72">
            My Tasks
          </p>
        </div>
        {/* List of Tasks */}
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : tasks && tasks.length > 0 ? (
          tasks.map((task: TaskType) => (
            <Task 
              key={task.id} 
              task={task} 
              onTaskDeleted={handleTaskDeleted}
              onTaskUpdated={handleTaskUpdated}
            />
          ))
        ) : (
          <p>There is no task....</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
