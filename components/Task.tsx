import * as React from "react";
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
import { type TaskType } from "@/lib/api";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
      <p className="text-[#0d141c] text-base font-normal leading-normal flex-1 truncate">
        {task.description}
      </p>
      <div className="shrink-0">
        <div className="flex size-7 items-center justify-center">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-[#cedbe8] border-2 bg-transparent text-[#0d80f2] checked:bg-[#0d80f2] checked:border-[#0d80f2] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#cedbe8] focus:outline-none"
          />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-amber-600 text-white opacity-80">Edit</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-gray-500">
          <form>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 mt-2.5">
              <div className="grid gap-3">
                <Input id="Task" name="Task" />
              </div>
            </div>

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button className="bg-red-900 text-white opacity-80">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-green-900 text-white">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button className="bg-red-600 text-white">Delete</Button>
    </div>
  );
};

export default Task;
