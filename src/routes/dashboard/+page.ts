import { error } from "@sveltejs/kit";
import type { GetShapes } from "../api/shapes/+server";
import type { GetUserShapes } from "../api/shapes/user/+server";

export async function load({ fetch }) {
  const shapesResp = await fetch("/api/shapes");
  if (!shapesResp.ok) {
    throw error(shapesResp.status);
  }

  const userShapesResp = await fetch("/api/shapes/user");
  if (!userShapesResp.ok) {
    throw error(userShapesResp.status);
  }

  const shapes: GetShapes = await shapesResp.json();
  const userShapes: GetUserShapes = await userShapesResp.json();
  return { shapes, userShapes };
}
