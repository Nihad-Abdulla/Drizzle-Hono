import { Hono } from 'hono';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasks.controller';

export const tasksRoutes = new Hono();

// Create Task
tasksRoutes.post('/', async (c) => {
  const data = await c.req.json();
  const result = await createTask(data);
  return c.json(result, 201);
});

// Get All Tasks
tasksRoutes.get('/', async (c) => {
  const tasks = await getTasks();
  return c.json(tasks);
});

// Update Task
tasksRoutes.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const data = await c.req.json();
  const result = await updateTask(id, data);
  return c.json(result);
});

// Delete Task
tasksRoutes.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await deleteTask(id);
  return c.json(result);
});
