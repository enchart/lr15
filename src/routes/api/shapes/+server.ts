import { error, json } from "@sveltejs/kit";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function GET({ request }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw error(401);
  }
  return json(await getShapes());
}

async function getShapes() {
  return await db.query.shapes.findMany({
    with: {
      prices: {
        columns: {
          createdAt: true,
          price: true,
        },
        limit: 25,
        orderBy: (prices, { desc }) => [desc(prices.createdAt)],
      },
    },
  });
}

export type GetShapes = Awaited<ReturnType<typeof getShapes>>;
