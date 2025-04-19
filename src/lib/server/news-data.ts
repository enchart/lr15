import type { shapeNews } from "@/server/db/schema";

export interface NewsData {
  shapeId: string;
  news: typeof shapeNews.$inferInsert;
  price: number;
}

let newsData: NewsData | null = null;

export function setNewsData(data: NewsData) {
  newsData = data;
}

export function getNewsData(): NewsData | null {
  return newsData;
}
