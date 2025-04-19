import { error } from "@sveltejs/kit";
import type { GetShapes } from "../api/shapes/+server";
import type { GetUserShapes } from "../api/shapes/user/+server";
import type { shapeNews } from "@/server/db/schema";

export async function load({ fetch }) {
  const shapesResp = await fetch("/api/shapes");
  if (!shapesResp.ok) {
    throw error(shapesResp.status);
  }

  const userShapesResp = await fetch("/api/shapes/user");
  if (!userShapesResp.ok) {
    throw error(userShapesResp.status);
  }

  const newsResp = await fetch("/api/shapes/news");
  if (!newsResp.ok) {
    throw error(newsResp.status);
  }

  const shapes: GetShapes = await shapesResp.json();
  const userShapes: GetUserShapes = await userShapesResp.json();
  const news: typeof shapeNews.$inferSelect = await newsResp.json();
  return { shapes, userShapes, news };
}
