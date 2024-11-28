import { create } from "zustand";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type Tag = {
  id: number;
  name: string;
};
type TaskTag = {
  taskId: number;
  tagId: number;
};

interface TaskTagsState {
  taskTags: TaskTag[]; // Store task-tag relationships
  setTaskTags: (tags: TaskTag[]) => void; // Set task tags
  fetchTaskTags: (taskId: number) => Promise<void>; // Fetch tags for a specific task
  assignTagToTask: (taskId: number, tagId: number) => Promise<void>; // Assign tag to task
  removeTagFromTask: (taskId: number, tagId: number) => Promise<void>; // Remove tag from task
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  setTasks: (tasks: Task[]) => void;
}

interface TagStore {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  updateTag: (tag: Tag) => void;
  deleteTag: (tagId: number) => void;
  setTags: (tags: Tag[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
  deleteTask: (taskId) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),
  setTasks: (tasks) => set({ tasks }),
}));

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  updateTag: (tag) =>
    set((state) => ({
      tags: state.tags.map((t) => (t.id === tag.id ? tag : t)),
    })),
  deleteTag: (tagId) =>
    set((state) => ({ tags: state.tags.filter((t) => t.id !== tagId) })),
  setTags: (tags) => set({ tags }),
}));


