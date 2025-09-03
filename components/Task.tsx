"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { type TaskType, deleteTask, updateTask, toggleTaskCompletion } from "@/lib/api";

interface TaskProps {
  task: TaskType;
  onTaskDeleted: () => void;
  onTaskUpdated: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [editDescription, setEditDescription] = useState(task.description);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await deleteTask(task.id);
        onTaskDeleted(); // Trigger refresh in parent component
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCheckboxChange = async () => {
    setIsToggling(true);
    try {
      await toggleTaskCompletion(task.id, !task.completed);
      onTaskUpdated(); // Trigger refresh in parent component
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      alert("Failed to update task status. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleEdit = () => {
    setEditDescription(task.description);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editDescription.trim()) {
      alert("Task description cannot be empty");
      return;
    }

    setIsUpdating(true);
    
    try {
      await updateTask(task.id, { 
        description: editDescription.trim(),
        completed: task.completed 
      });
      setIsDialogOpen(false);
      setIsEditing(false);
      onTaskUpdated(); // Trigger refresh in parent component
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditDescription(task.description);
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
      <p 
        className={`text-[#0d141c] text-base font-normal leading-normal flex-1 truncate ${
          task.completed ? 'line-through opacity-60' : ''
        }`}
      >
        {task.description}
      </p>
      <div className="shrink-0">
        <div className="flex size-7 items-center justify-center">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-[#cedbe8] border-2 bg-transparent text-[#0d80f2] checked:bg-[#0d80f2] checked:border-[#0d80f2] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#cedbe8] focus:outline-none cursor-pointer"
            checked={task.completed}
            onChange={handleCheckboxChange}
            disabled={isToggling}
          />
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            className="bg-amber-600 text-white opacity-80"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-gray-500">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 mt-2.5">
              <div className="grid gap-3">
                <Input 
                  id="task-description"
                  name="description"
                  placeholder="Enter task description..."
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  disabled={isUpdating}
                />
              </div>
            </div>

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button 
                  type="button"
                  className="bg-red-900 text-white opacity-80"
                  onClick={handleCancel}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="bg-green-900 text-white"
                disabled={isUpdating || !editDescription.trim()}
              >
                {isUpdating ? "Updating..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button 
        className="bg-red-600 text-white"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default Task;
