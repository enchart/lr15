import { error } from "@sveltejs/kit";
import { produce } from "sveltekit-sse";
import { auth } from "@/server/auth";
import { getNewsData } from "@/server/news-data";

function delay(ms: number) {
  return new Promise(function run(resolve) {
    setTimeout(resolve, ms);
  });
}

export async function POST({ request }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw error(401);
  }
  return produce(async ({ emit }) => {
    while (true) {
      const newsData = getNewsData();
      if (newsData) {
        const { error } = emit("newsData", JSON.stringify(newsData));
        if (error) {
          return;
        }
      }
      await delay(250);
    }
  });
}
