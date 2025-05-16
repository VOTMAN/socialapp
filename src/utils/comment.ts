"use server";

import { db } from "@/db/db";
import { comment as commentTable, user as userTable } from "@/db/schema";
import { randomUUID } from "crypto";
import { getUserIdFromName } from "./user";
import { eq } from "drizzle-orm";

export async function getComments(postId: string) {
  try {
    const res = await db
      .select({
        id: commentTable.id,
        name: userTable.name,
        userImg: userTable.image,
        time: commentTable.createdAt,
        content: commentTable.content,
      })
      .from(commentTable)
      .leftJoin(userTable, eq(commentTable.userId, userTable.id))
      .where(eq(commentTable.postId, postId));
    return { success: true, data: res };
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function makeComment(
  postId: string,
  username: string,
  body: string
) {
  try {
    const result = await getUserIdFromName(username);
    if (!result || !result.success) {
      throw new Error("No user id returned");
    }
    if (!result.data) {
      throw new Error("User ID is undefined");
    }
    
    const comObj = {
      id: randomUUID(),
      postId: postId,
      userId: result.data,
      content: body,
    };
    await db.insert(commentTable).values(comObj);
    return { success: true, data: comObj };
  } catch (e) {
    return { success: false, error: e };
  }
}
