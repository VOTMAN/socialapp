"use server";

import { db } from "@/db/db";
import { like as likeTable, post as postTable } from "@/db/schema";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";

export async function getPostLikes() {
  try {
    const posts = await db.select().from(postTable);
    const postLikes = await Promise.all(
      posts.map(async (post) => {
        const likes = await db.$count(likeTable, eq(likeTable.postId, post.id));
        return { postId: post.id, likes };
      })
    );
    return { success: true, data: postLikes };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Failed to fetch post likes" };
  }
}

export async function getUserLikes(userId: string) {
  try {
    const res = await db
      .select()
      .from(likeTable)
      .where(eq(likeTable.userId, userId));

    return { success: true, data: res };
  } catch (e) {
    console.error(e);
  }
}


// export async function getPostStatus(postId: string) {
  
// }

///------------------------------------------------------------------

export async function likePost(likingUserId: string, pId: string) {
  const likeObj = {
    id: randomUUID(),
    userId: likingUserId,
    postId: pId,
  };
  try {
    const check = await db.$count(
      likeTable,
      and(eq(likeTable.userId, likingUserId), eq(likeTable.postId, pId))
    );
    if (check) {
      return { success: false, error: "Already Liked" };
    } else {
      await db.insert(likeTable).values(likeObj);
      // console.log(res);
      return { success: true, message: "Post liked successfully" };
    }
  } catch (e) {
    // console.log(e);
    return { success: false, error: e };
  }
}

export async function dislikePost(likingUserId: string, pId: string) {
  try {
    const check = await db.$count(
      likeTable,
      eq(likeTable.userId, likingUserId) && eq(likeTable.postId, pId)
    );
    if (!check) {
      return { success: false, error: "Not liked yet" };
    } else {
      await db
        .delete(likeTable)
        .where(
          and(eq(likeTable.postId, pId), eq(likeTable.userId, likingUserId))
        );
      // console.log(res);
      return {success: true}
    }
  } catch (e) {
    return {success: false, error: e}
  }
}
