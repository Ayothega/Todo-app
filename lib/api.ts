// API utility functions for client-side data fetching

export interface TaskType {
  id: string;
  description: string;
  completed: boolean;
}

export interface CreateTask {
  id: string;
  description: string;
  completed?: boolean;
}

/*
  export interface UpdatePostData {
    title: string
    content?: string
    published?: boolean
  }
  */
// Fetch all posts
export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

// Fetch a single post
export async function fetchTask(id: string): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }
  return response.json();
}

// Create a new post
export async function createPost(data: CreateTask): Promise<Task> {
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
/*
  // Update a post
  export async function updatePost(id: string, data: UpdatePostData): Promise<Post> {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  
    if (!response.ok) {
      throw new Error("Failed to update post")
    }
    return response.json()
  }


// Delete a post
export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
}
*/
