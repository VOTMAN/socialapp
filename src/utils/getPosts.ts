'use server'

import { db } from "@/db/db"
import { post as postTable, user as userTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function getUserPosts() {
    try {
        const res = await db.select().from(postTable).leftJoin(userTable, eq(postTable.userId, userTable.id)).orderBy(desc(postTable.createdAt))
        return {success: true, data: res}
    } catch (e) {
        return {success: false, error: e}
    }
}