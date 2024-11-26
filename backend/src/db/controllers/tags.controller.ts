import { db } from '../../index'
import { tagsTable } from '../schema'
import { eq } from 'drizzle-orm';

// Create Tag
export const createTag = async (name: string) => {
  await db.insert(tagsTable).values({ name });
  return { message: 'Tag created successfully' };
};

// Get All Tags
export const getTags = async () => {
  return await db.select().from(tagsTable);
};

// Update Tag
export const updateTag = async (id: number, name: string) => {
  await db.update(tagsTable).set({ name }).where(eq(tagsTable.id, id));
  return { message: 'Tag updated successfully' };
};

// Delete Tag
export const deleteTag = async (id: number) => {
  await db.delete(tagsTable).where(eq(tagsTable.id, id));
  return { message: 'Tag deleted successfully' };
};
