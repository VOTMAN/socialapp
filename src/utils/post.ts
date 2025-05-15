"use server";

import { db } from "@/db/db";
import { post as postTable, user as userTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllPosts() {
  try {
    const res = await db
      .select()
      .from(postTable)
      .leftJoin(userTable, eq(postTable.userId, userTable.id))
      .orderBy(desc(postTable.createdAt));
    return { success: true, data: res };
  } catch (e) {
    return { success: false, error: e };
  }
}
export async function getUserPosts(user_id: string) {
  try {
    const res = await db
      .select()
      .from(postTable)
      .where(eq(postTable.userId, user_id))
      .orderBy(desc(postTable.createdAt));
    // console.log(res)
    return { success: true, data: res };
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function getPostById(postId: string) {
  try {
    const res = await db
      .select({
      post: postTable,
      userName: userTable.name
      })
      .from(postTable)
      .leftJoin(userTable, eq(postTable.userId, userTable.id))
      .where(eq(postTable.id, postId));
    if (!res.length) {
      return { success: false, error: "No such post exists" };
    }
    return { success: true, data: res };
  } catch (e) {
    return { success: false, error: e };
  }
}
