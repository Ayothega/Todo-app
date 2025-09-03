"use client";

import * as React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Tasks from "../components/Tasks";

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddTask = () => {
    // Trigger a refresh of the tasks list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <Header handleAddTask={handleAddTask} />
        <Tasks refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
