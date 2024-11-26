import { Hono } from 'hono';
import { createTag, getTags, updateTag, deleteTag } from '../controllers/tags.controller';

export const tagsRoutes = new Hono();

// Create Tag
tagsRoutes.post('/', async (c) => {
  const data = await c.req.json();
  const result = await createTag(data.name);
  return c.json(result, 201);
});

// Get All Tags
tagsRoutes.get('/', async (c) => {
  const tags = await getTags();
  return c.json(tags);
});

// Update Tag
tagsRoutes.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const data = await c.req.json();
  const result = await updateTag(id, data.name);
  return c.json(result);
});

// Delete Tag
tagsRoutes.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await deleteTag(id);
  return c.json(result);
});
