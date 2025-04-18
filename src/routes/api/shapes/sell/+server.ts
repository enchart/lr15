import { error } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { shapes, users, usersShapes } from "@/server/db/schema";

const schema = v.object({
  shapeId: v.string(),
});

export async function POST({ request }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw error(401);
  }

  const json = await request.json();
  const parsed = await v.safeParseAsync(schema, json);
  if (!parsed.success) {
    throw error(400);
  }

  const shape = await db.query.shapes.findFirst({
    where: eq(shapes.id, parsed.output.shapeId),
    with: {
      prices: {
        limit: 1,
        orderBy: (prices, { desc }) => [desc(prices.createdAt)],
      },
    },
  });
  if (!shape) {
    throw error(404);
  }

  const userShapes = await db.query.usersShapes.findFirst({
    where: and(eq(usersShapes.userId, session.user.id), eq(usersShapes.shapeId, shape.id)),
  });
  if (userShapes) {
    if (userShapes.amount === 1) {
      await db
        .delete(usersShapes)
        .where(and(eq(usersShapes.userId, session.user.id), eq(usersShapes.shapeId, shape.id)));
    } else {
      await db
        .update(usersShapes)
        .set({ amount: userShapes.amount - 1 })
        .where(and(eq(usersShapes.userId, session.user.id), eq(usersShapes.shapeId, shape.id)));
    }
  } else {
    throw error(400);
  }

  await db
    .update(users)
    .set({ balance: session.user.balance + shape.prices[0].price })
    .where(eq(users.id, session.user.id));

  return new Response();
}
