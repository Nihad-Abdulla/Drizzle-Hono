import { Hono } from 'hono';
import { assignTagToTask, removeTagFromTask, getTasksByTag } from '../controllers/taskTags.controller';

export const taskTagsRoutes = new Hono();

// Assign Tag to Task
taskTagsRoutes.post('/:taskId/tag/:tagId', async (c) => {
  const taskId = Number(c.req.param('taskId')); 
  const tagId = Number(c.req.param('tagId')); 
  
  // Call the controller to assign the tag to the task
  const result = await assignTagToTask(taskId, tagId);
  return c.json(result, 201); 
});

// Remove Tag from Task
taskTagsRoutes.delete('/:taskId/tag/:tagId', async (c) => {
  const taskId = Number(c.req.param('taskId'));
  const tagId = Number(c.req.param('tagId')); 
  
  
  const result = await removeTagFromTask(taskId, tagId);
  return c.json(result); 
});

// Get Tasks by Tag
taskTagsRoutes.get('/tag/:tagId/tasks', async (c) => {
  const tagId = Number(c.req.param('tagId')); 
  
  
  const tasks = await getTasksByTag(tagId);
  return c.json(tasks);
});
