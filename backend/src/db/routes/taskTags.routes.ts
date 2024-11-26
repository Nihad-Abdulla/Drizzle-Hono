import { Hono } from 'hono';
import { assignTagToTask, removeTagFromTask, getTasksByTag } from '../controllers/taskTags.controller';

export const taskTagsRoutes = new Hono();

// Assign Tag to Task
taskTagsRoutes.post('/:taskId/tag/:tagId', async (c) => {
  const taskId = Number(c.req.param('taskId')); // Task ID from the URL
  const tagId = Number(c.req.param('tagId')); // Tag ID from the URL
  
  // Call the controller to assign the tag to the task
  const result = await assignTagToTask(taskId, tagId);
  return c.json(result, 201); // Return 201 status for created resource
});

// Remove Tag from Task
taskTagsRoutes.delete('/:taskId/tag/:tagId', async (c) => {
  const taskId = Number(c.req.param('taskId')); // Task ID from the URL
  const tagId = Number(c.req.param('tagId')); // Tag ID from the URL
  
  // Call the controller to remove the tag from the task
  const result = await removeTagFromTask(taskId, tagId);
  return c.json(result); // Return the result of the deletion
});

// Get Tasks by Tag
taskTagsRoutes.get('/tag/:tagId/tasks', async (c) => {
  const tagId = Number(c.req.param('tagId')); // Tag ID from the URL
  
  // Call the controller to get tasks associated with the tag
  const tasks = await getTasksByTag(tagId);
  return c.json(tasks); // Return the list of tasks
});
