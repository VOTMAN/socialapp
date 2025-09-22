"use server";

import { db } from "@/db/db";
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(id: string) {
  try {
    const res = await db.select().from(userTable).where(eq(userTable.id, id));
    if (!res.length) throw new Error("No such user");
    return { success: true, data: res[0] };
  } catch (e) {
    return { success: false, error: e };
  }
}
