import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { shapeNews, shapePrices, shapes } from "@/server/db/schema";
import { random } from "@/utils/math";

const defaultShapes = [
  {
    id: "square",
    name: "Квадрат",
    color: "#4287f5",
    price: 100.0,
  },
  {
    id: "circle",
    name: "Круг",
    color: "#32a852",
    price: 100.0,
  },
  {
    id: "triangle",
    name: "Треугольник",
    color: "#ad482f",
    price: 100.0,
  },
];

async function createRandomNews() {
  const shape = defaultShapes[Math.floor(Math.random() * defaultShapes.length)];

  // await db.insert(shapeNews).values({
  //   shapeId: shape.id,
  //   title: 
  //   text: "TODO",
  // })
}

export async function init() {
  async function insertShape(id: string, name: string, color: string, price: number) {
    await db.insert(shapes).values({
      id,
      name,
      color,
      description: "TODO",
    });

    price = price * 100;
    for (let i = 0; i < 20; i++) {
      price += random(-100, 100);
      await db.insert(shapePrices).values({
        shapeId: id,
        createdAt: new Date(Date.now() - (19 - i) * 10000),
        price,
      });
    }
  }

  await db.delete(shapes);
  for (const defaultShape of defaultShapes) {
    await insertShape(defaultShape.id, defaultShape.name, defaultShape.color, defaultShape.price);
  }
}

const handleAuth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};

const handleHeaders: Handle = async ({ event, resolve }) => {
  return resolve(event, {
    filterSerializedResponseHeaders: (key, _) => key === "content-type",
  });
};

export const handle = sequence(handleAuth, handleHeaders);
