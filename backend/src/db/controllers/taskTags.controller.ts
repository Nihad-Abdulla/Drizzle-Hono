import { db } from "../../index"; // Ensure correct import of db connection
import { taskTagsTable, tasksTable } from "../schema"; // Import tasksTable correctly
import { eq, and } from 'drizzle-orm';

// Assign a tag to a task
export const assignTagToTask = async (taskId: number, tagId: number) => {
  const result = await db.insert(taskTagsTable).values({ taskId, tagId });
  return { message: 'Tag assigned to task successfully', result };
};

// Remove a tag from a task
export const removeTagFromTask = async (taskId: number, tagId: number) => {
    const result = await db.delete(taskTagsTable)
      .where(and( // Combine conditions with 'and'
        eq(taskTagsTable.taskId, taskId),
        eq(taskTagsTable.tagId, tagId)
      ));
    return { message: 'Tag removed from task successfully', result };
  };

// Get tasks by tag ID
export const getTasksByTag = async (tagId: number) => {
  return await db
    .select() // Start with select() method
    .from(taskTagsTable) // Reference the relationship table
    .innerJoin(tasksTable, eq(taskTagsTable.taskId, tasksTable.id)) // Join tasksTable correctly
    .where(eq(taskTagsTable.tagId, tagId)); // Use where() to filter by tagId
};
