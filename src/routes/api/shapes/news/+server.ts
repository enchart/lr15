import { error, json } from "@sveltejs/kit";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function POST({ request }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw error(401);
  }

  const news = await db.query.shapeNews.findMany({
    orderBy: (shapeNews, { desc }) => [desc(shapeNews.createdAt)],
    limit: 10,
  });

  return json(news);
}
