import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { usersShapes } from "@/server/db/schema";

export async function GET({ request }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw error(401);
  }
  return json(await getUserShapes(session.user.id));
}

async function getUserShapes(userId: string) {
  return await db.query.usersShapes.findMany({
    where: eq(usersShapes.userId, userId),
  });
}

export type GetUserShapes = Awaited<ReturnType<typeof getUserShapes>>;
