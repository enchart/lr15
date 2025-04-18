import { CircleIcon, SquareIcon, StarIcon, TriangleIcon } from "@lucide/svelte";
import type { Component } from "svelte";

export function getShapeIcon(id: string): Component {
  switch (id) {
    case "square":
      return SquareIcon;
    case "circle":
      return CircleIcon;
    case "triangle":
      return TriangleIcon;
    default:
      return StarIcon;
  }
}
