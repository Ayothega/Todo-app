import * as React from "react";
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

export const Header = ({ handleAddTask }) => {
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
          <Dialog>
            <DialogTrigger asChild>
              <button className="h-10 bg-[#e7edf4] text-[#0d141c] rounded-lg px-2.5">
                <Cross className="text-[#0d141c]" size={20} />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-gray-500">
              <form onSubmit={handleAddTask}>
                <DialogHeader>
                  <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 mt-2.5">
                  <div className="grid gap-3">
                    <Input
                      id="name-1"
                      name="name"
                      value={null}
                      onChange={null}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-3">
                  <DialogClose asChild>
                    <Button className="bg-red-900 text-white">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-green-900 text-white">
                    Save
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
