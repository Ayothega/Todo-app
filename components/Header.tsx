"use client";

import * as React from "react";
import { useState } from "react";
import { Hourglass, Cross } from "lucide-react";
import { Button } from "../components/ui/button";
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
import { createTask } from "@/lib/api";

interface HeaderProps {
  handleAddTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ handleAddTask }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskDescription.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createTask({ description: taskDescription.trim() });
      setTaskDescription("");
      setIsDialogOpen(false);
      handleAddTask(); // Trigger refresh in parent component
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="layout-container flex h-full grow flex-col">
      <header className="flex items-center justify-between border-b border-solid border-b-[#e7edf4] px-10 py-3">
        {/* Logo */}
        <div className="flex items-center text-[#0d141c]">
          <Hourglass fill="black" size={18} />
          <h2 className="text-lg font-bold mx-0.5">TaskMaster</h2>
        </div>

        {/* Add Task */}
        <div className="flex flex-1 justify-end gap-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="h-10 bg-[#e7edf4] text-[#0d141c] rounded-lg px-2.5">
                <Cross className="text-[#0d141c]" size={20} />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-gray-500">
              <form onSubmit={onSubmit}>
                <DialogHeader>
                  <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 mt-2.5">
                  <div className="grid gap-3">
                    <Input
                      id="task-description"
                      name="description"
                      placeholder="Enter task description..."
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-3">
                  <DialogClose asChild>
                    <Button 
                      type="button" 
                      className="bg-red-900 text-white"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button 
                    type="submit" 
                    className="bg-green-900 text-white"
                    disabled={isSubmitting || !taskDescription.trim()}
                  >
                    {isSubmitting ? "Creating..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </div>
  );
};

export default Header;
