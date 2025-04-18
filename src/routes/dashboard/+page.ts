import { error } from "@sveltejs/kit";
import type { GetShapes } from "../api/shapes/+server";

export async function load({ fetch }) {
  const response = await fetch("/api/shapes");
  if (!response.ok) {
    throw error(response.status);
  }

  const shapes: GetShapes = await response.json();
  return { shapes };
}
