'use server'

import { db } from "@/db/db"
import { User } from "better-auth";
import { post as postTable } from "@/db/schema";
import { randomUUID } from "crypto";

export default async function makePost(post: string, userData: User, imageId?: string) {
  const postObj = {
    id: randomUUID(),
    userId: userData.id,
    content: post,
    imageUrl: imageId || null,
  };

  try {
    await db.insert(postTable).values(postObj);
    return {success: true, data: postObj};
  } catch (e) {
    // console.error("Failed to insert post:", error);
    return {success: false, error: e}
  }
}
