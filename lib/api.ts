// API utility functions for client-side data fetching

export interface TaskType {
  id: string;
  description: string;
  completed: boolean;
}

export interface CreateTask {
  description: string;
  completed?: boolean;
}

export interface UpdateTask {
  description: string;
  completed?: boolean;
}

// Fetch all tasks
export async function fetchTasks(): Promise<TaskType[]> {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

// Fetch a single task
export async function fetchTask(id: string): Promise<TaskType> {
  const response = await fetch(`/api/tasks/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }
  return response.json();
}

// Create a new task
export async function createTask(data: CreateTask): Promise<TaskType> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
}

// Update a task
export async function updateTask(id: string, data: UpdateTask): Promise<TaskType> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
}

// Toggle task completion status
export async function toggleTaskCompletion(id: string, completed: boolean): Promise<TaskType> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to toggle task completion");
  }
  return response.json();
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}
