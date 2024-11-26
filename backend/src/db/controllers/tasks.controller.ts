import { db } from '../../index'
import { tasksTable } from '../schema'
import { eq } from 'drizzle-orm';

// Create Task
export const createTask = async (data: { title: string, description: string }) => {
  await db.insert(tasksTable).values(data);
  return { message: 'Task created successfully' };
};

// Get All Tasks
export const getTasks = async () => {
  return await db.select().from(tasksTable);
};

// Update Task
export const updateTask = async (id: number, data: { title?: string, description?: string, completed?: boolean }) => {
  await db.update(tasksTable).set(data).where(eq(tasksTable.id, id));
  return { message: 'Task updated successfully' };
};

// Delete Task
export const deleteTask = async (id: number) => {
  await db.delete(tasksTable).where(eq(tasksTable.id, id));
  return { message: 'Task deleted successfully' };
};
