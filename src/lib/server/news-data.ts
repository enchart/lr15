import type { shapeNews } from "@/server/db/schema";

let newsData: typeof shapeNews.$inferInsert | null = null;

export function setNewsData(data: typeof shapeNews.$inferInsert) {
  newsData = data;
}

export function getNewsData(): typeof shapeNews.$inferInsert | null {
  return newsData;
}
