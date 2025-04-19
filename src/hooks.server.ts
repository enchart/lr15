import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { shapeNews, shapePrices, shapes, users } from "@/server/db/schema";
import { setNewsData } from "@/server/news-data";
import { random, randomFromList } from "@/utils/math";
import { formatPrice } from "@/utils/price";

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
  const defaultShape = defaultShapes[Math.floor(Math.random() * defaultShapes.length)];
  const shape = await db.query.shapes.findFirst({
    where: eq(shapes.id, defaultShape.id),
    with: {
      prices: {
        limit: 1,
        orderBy: (prices, { desc }) => [desc(prices.createdAt)],
      },
    },
  });
  if (!shape) {
    console.error("default shape was not present in db");
    return;
  }

  const type = randomFromList("up", "up", "up", "down", "down", "down", "bigUp", "bigDown");

  let change: number;
  switch (type) {
    case "up":
      change = Number(random(1_00, 3_00).toFixed(2));
      break;
    case "down":
      change = -Number(random(1_00, 3_00).toFixed(2));
      break;
    case "bigUp":
      change = Number(random(5_00, 10_00).toFixed(2));
      break;
    case "bigDown":
      change = -Number(random(5_00, 10_00).toFixed(2));
      break;
  }

  let comment: string;
  switch (type) {
    case "up":
      comment = "повышение";
      break;
    case "down":
      comment = "снижение";
      break;
    case "bigUp":
      comment = "рост";
      break;
    case "bigDown":
      comment = "падение";
      break;
    default:
      comment = "изменение";
      break;
  }

  const price = shape.prices[0].price + change;

  const news = {
    shapeId: shape.id,
    title: `${shape.name}: ${comment} цены на ${formatPrice(Math.abs(change))}`,
    content: "TODO",
    createdAt: new Date(),
    price,
    change,
  };

  if (price <= 0) {
    console.log("negative price");
    createRandomNews();
    return;
  }

  if (price >= 100_000_000_00) {
    console.log("too big price");
    createRandomNews();
    return;
  }

  await db.insert(shapeNews).values(news);
  await db.insert(shapePrices).values({ shapeId: shape.id, price });

  console.log(news.title);
  setNewsData(news);
  setTimeout(createRandomNews, random(5000, 15000));
}

export async function init() {
  async function insertShape(id: string, name: string, color: string, price: number) {
    await db.insert(shapes).values({
      id,
      name,
      color,
      description: "TODO",
    });

    price = Number((price * 100).toFixed(0));
    for (let i = 0; i < 20; i++) {
      price += Math.round(random(-2_00, 2_00));
      await db.insert(shapePrices).values({
        shapeId: id,
        createdAt: new Date(Date.now() - (19 - i) * 10000),
        price,
      });
    }
  }

  await db.delete(shapes);
  await db.update(users).set({ balance: 1000_00 });
  for (const defaultShape of defaultShapes) {
    await insertShape(defaultShape.id, defaultShape.name, defaultShape.color, defaultShape.price);
  }

  createRandomNews();
}

const handleAuth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};

const handleHeaders: Handle = async ({ event, resolve }) => {
  return resolve(event, {
    filterSerializedResponseHeaders: (key, _) => key === "content-type",
  });
  return resolve(event);
};

export const handle = sequence(handleAuth, handleHeaders);

export const handleFetch = async ({ request, fetch }) => {
  // if (request.url.startsWith(apiUrl)) {
  //   // Workaround: https://github.com/sveltejs/kit/issues/6608
  //   request.headers.set('origin', appUrl)
  // }
  console.log(request.url);
  return fetch(request);
};
