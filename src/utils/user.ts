"use server"

import { db } from "@/db/db";
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserIdFromName(name: string) {
  try {
    const res = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.name, name));
    if (!res.length) throw new Error("No such user");
    return { success: true, data: res[0].id };
  } catch (e) {
    return {success: false, error: e}
  }
}
