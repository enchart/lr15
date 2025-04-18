import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { shapePrices, shapes } from "@/server/db/schema";
import { random } from "@/utils/math";

export async function init() {
  async function insertShape(id: string, name: string) {
    await db.insert(shapes).values({
      id,
      name,
      description: "TODO",
      color: "#4287f5",
    });

    let price = 10000;
    for (let i = 0; i < 10; i++) {
      price += random(-100, 100);
      await db.insert(shapePrices).values({
        shapeId: id,
        createdAt: new Date(Date.now() - (9 - i) * 10000),
        price,
      });
    }
  }

  await db.delete(shapes);
  await insertShape("square", "Квадрат");
  await insertShape("circle", "Круг");
  await insertShape("triangle", "Треугольник");
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
