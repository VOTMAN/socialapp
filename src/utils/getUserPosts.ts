'use server'

import { db } from "@/db/db"
import { post as postTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function getUserPosts(user_id: string) {
    try {
        const res = await db.select().from(postTable).where(eq(postTable.userId, user_id)).orderBy(desc(postTable.createdAt));
        console.log(res)
        return {success: true, data: res}
    } catch (e) {
        return {success: false, error: e}
    }
}