import { integer, text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";

// Tasks Table
export const tasksTable = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false)
});

// Tags Table
export const tagsTable = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

// Task-Tags Relationship Table (many-to-many relationship)
export const taskTagsTable = sqliteTable("task_tags", {
  taskId: integer("task_id").references(() => tasksTable.id),
  tagId: integer("tag_id").references(() => tagsTable.id),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.taskId, table.tagId] }), // composite primary key
  };
});
