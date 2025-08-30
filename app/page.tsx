import * as React from "react";
import Header from "../components/Header";
import Tasks from "../components/Tasks";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <Header />
        <Tasks />
      </div>
    </div>
  );
}
