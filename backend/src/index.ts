import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { tasksRoutes } from './db/routes/tasks.routes'
import { tagsRoutes } from './db/routes/tags.routes'
import { taskTagsRoutes } from './db/routes/taskTags.routes'; 


const app = new Hono()

const client = createClient({ url: process.env.DB_FILE_NAME! });
export const db = drizzle({ client });

app.route('/tasks', tasksRoutes);
app.route('/tags', tagsRoutes);
app.route('/task-tags', taskTagsRoutes);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
