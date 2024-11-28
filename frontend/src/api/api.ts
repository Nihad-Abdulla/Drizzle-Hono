import axios from "axios";

// API Setup
const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your actual backend URL
});

// Type Definitions
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;

}

interface Tag {
  id: number;
  name: string;
}

// Fetch Tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data;
};

// Fetch Tags
export const fetchTags = async (): Promise<Tag[]> => {
  const response = await api.get("/tags");
  return response.data;
};

// Add Task
export const addTask = async (task: { title: string; description: string; completed: boolean }): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data;
};

// Add Tag
export const addTag = async (tag: { name: string }): Promise<Tag> => {
  const response = await api.post("/tags", tag);
  return response.data;
};

// Delete Task
export const deleteTask = async (taskId: number): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};

// Delete Tag
export const deleteTag = async (tagId: number): Promise<void> => {
  await api.delete(`/tags/${tagId}`);
};

// Update Task
export const updateTask = async (task: { id: number; title: string; description: string; completed: boolean }): Promise<Task> => {
  const response = await api.put(`/tasks/${task.id}`, task);
  return response.data;
};

// Update Tag
export const updateTag = async (tag: { id: number; name: string }): Promise<Tag> => {
  const response = await api.put(`/tags/${tag.id}`, tag);
  return response.data;
};


// Assign tag to task
export const assignTagToTask = async (taskId: number, tagId: number) => {
  const response = await api.post(`/task-tags/${taskId}/tag/${tagId}`);
  return response.data;
};

// Remove tag from task
export const removeTagFromTask = async (taskId: number, tagId: number) => {
  const response = await api.delete(`/task-tags/${taskId}/tag/${tagId}`);
  return response.data;
};

